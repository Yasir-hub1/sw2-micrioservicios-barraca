<template>
  <b-modal id="customer-modal" :title="modalTitle" hide-footer v-model="showModal" @hidden="resetModal">
    <loading :isLoading="isLoading"></loading>
    <div class="modal-body">
      <form @submit.prevent="store_customer">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group bmd-form-group" >
              <label class="bmd-label-floating">CI</label>
              <input type="text" class="form-control" v-model="ci" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group bmd-form-group" >
              <label class="bmd-label-floating">Complemento</label>
              <input type="text" class="form-control" v-model="complement" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">NIT</label>
              <input type="text" class="form-control" v-model="nit">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group bmd-form-group" >
              <label class="bmd-label-floating">Nombre</label>
              <input type="text" class="form-control" v-model="name" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group bmd-form-group" >
              <label class="bmd-label-floating">Telefono</label>
              <input type="text" class="form-control" v-model="phone1">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group bmd-form-group" >
              <label class="bmd-label-floating">Correo</label>
              <input type="email" class="form-control" v-model="email">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group bmd-form-group" >
              <label class="bmd-label-floating">Dirección</label>
              <input type="text" class="form-control" v-model="address">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mt-3">
            <div class="dropdown bootstrap-select show" >
              <label class="bmd-label-floating">Ciudad</label>
              <select class="selectpicker" data-style="btn btn-primary btn-round" title="Seleccione Ciudad"
                v-model="city_id">
                <option v-for="city in arrayCity" :key="city._id" :value="city._id" aria-required="required">{{ city.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success">Guardar</button>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" @click="closeModal">Cerrar</button>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {
  props: {
    showModal: Boolean,
    modalTitle: String,
    ci: String,
    nit: String,
    name: String,
    phone1: String,
    email: String,
    address: String,
    city_id: String,
    identity_document_type_id: String,
    arrayCity: Array,
    complement: String,
    toastSuccessMessage: Boolean // Recibir `toast` como una prop
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:showModal', false);
    },
    resetModal() {
      this.$emit('reset');
    },
    async store_customer() {
      try {
        this.isLoading = true;
        let resp = await axios.post("http://3.139.103.136/api/customer", {
          nit: this.nit,
          name: this.name,
          ci: this.ci,
          complement: this.complement,
          phone: this.phone1,
          email: this.email,
          address: this.address,
          city_id: this.city_id,
        });
        console.log("this ", resp)
        this.$emit('customer-stored', "Cliente registrado"); // Emite un evento con los datos del cliente
        this.$emit('update:showModal', false);
        this.isLoading = false;
      } catch (error) {
        console.error(error);
        // this.$attrs.toast.error(error.message);
        this.isLoading = false;
      }
    },
  }
};
</script>
