<template>
  <b-modal id="custom-modal" :title="nombreModal" @ok="saveChanges" @hidden="resetForm">
    <div class="form-group">
      <label for="especie">Especie:</label>
      <input type="text" class="form-control" id="especie" :value="nombreEspecie" disabled>
    </div>
    <div class="form-group">
      <label for="espesor">Espesor:</label>
      <input type="text" class="form-control" id="espesor" v-model="formData.espesor" disabled>
    </div>
    <div class="form-group">
      <label for="ancho">Ancho:</label>
      <input type="text" class="form-control" id="ancho" v-model="formData.ancho" disabled>
    </div>
    <div class="form-group">
      <label for="largo">Largo:</label>
      <input type="text" class="form-control" id="largo" v-model="formData.largo" disabled>
    </div>
    <div class="form-group">
      <label for="cantidad">Cantidad:</label>
      <input type="number" class="form-control" id="cantidad" v-model="formData.cantidad" disabled>
    </div>
    <div class="form-group">
      <label for="cantidadAjuste">Cantidad a {{ action }}:</label>
      <input type="number" class="form-control" id="cantidadAjuste" v-model="formData.cantidadAjuste">
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  props: ['action', 'itemData', "opciones_especies"],
  data() {
    return {
      formData: {
        especieId: '',
        espesor: '',
        ancho: '',
        largo: '',
        cantidad: 0,
        cantidadAjuste: 0,
      },
      nombreModal:"",
      nombreEspecie: "",
    };
  },
  watch: {

    itemData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.formData = { ...newData, cantidadAjuste: 0 };
          this.nombreEspecie="Modal " + this.action
        }
        const especie = this.opciones_especies.find(especie => especie.id === this.formData.especieId);
        this.nombreEspecie = especie ? especie.nombre : 'Especie no encontrada';
      }
    }
  },
  methods: {
    async saveChanges() {
      if (this.formData.cantidadAjuste <= 0) {
        // alert("La cantidad de ajuste debe ser mayor a cero.");
        this.$emit('message',"La cantidad de ajuste debe ser mayor a cero.");
        return;
      }

      if (this.action === "Decrementar" && this.formData.cantidadAjuste > this.formData.cantidad) {
        // alert("No se puede decrementar más de la cantidad actual.");
        this.$emit('message',"No se puede decrementar más de la cantidad actual.");
        return;
      }

      try {
        const actionType = this.action === "Incrementar" ? "INC" : "DEC";
        await axios.post("https://msinventario-zgaud6cq5q-uc.a.run.app/api/actualizar-cantidad", {
          id_producto: this.formData.id,
          cantidad_entrante: this.formData.cantidadAjuste,
          action: actionType
        });
        this.$emit(actionType === "INC" ? 'incremento' : 'decrementar', `${actionType === "INC" ? "Incremento" : "Decremento"} registrado`);
        this.resetForm()
        this.$root.$emit('bv::hide::modal', 'custom-modal');
      } catch (error) {
        this.$emit(actionType === "INC" ? 'incremento' : 'decrementar', `Error al ${actionType === "INC" ? "incrementar" : "decrementar"}`);
        this.$root.$emit('bv::hide::modal', 'custom-modal');
      }
    }
  },
  resetForm() {
    this.formData = {
      especieId: '',
      espesor: '',
      ancho: '',
      largo: '',
      cantidad: 0,
      cantidadAjuste: 0,
    };
    this.nombreEspecie = "";
    this.nombreModal="";
  },
  mounted() {
    const especie = this.opciones_especies.find(especie => especie.id === this.formData.especieId);
    this.nombreEspecie = especie ? especie.nombre : 'Especie no encontrada';
  }
};
</script>
