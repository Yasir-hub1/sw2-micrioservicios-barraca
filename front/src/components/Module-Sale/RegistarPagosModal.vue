<template>
  <b-modal id="registrar-pagos-modal" title="Registrar Pagos" @hide="resetModal" size="lg">
    <div class="modal-body">
      <form @submit.prevent="submitPago">
        <div class="form-group">
          <label for="fecha-venta">Fecha de Venta</label>
          <input type="text" class="form-control" id="fecha-venta" v-model="localPagoData.fecha_venta" disabled>
        </div>
        <div class="form-group">
          <label for="nombre-cliente">Nombre Cliente</label>
          <input type="text" class="form-control" id="nombre-cliente" v-model="localPagoData.nombre_cliente" disabled>
        </div>
        <div class="form-group">
          <label for="monto-total">Monto Total</label>
          <input type="text" class="form-control" id="monto-total" v-model="localPagoData.monto_total" disabled>
        </div>
        <div class="form-group">
          <label for="monto-pagado">Monto Pagado</label>
          <input type="text" class="form-control" id="monto-pagado" v-model="localPagoData.monto_pagado" disabled>
        </div>
        <div class="form-group">
          <label for="monto-saldo">Monto Saldo</label>
          <input type="text" class="form-control" id="monto-saldo" v-model="localPagoData.monto_saldo" disabled>
        </div>
        <div class="form-group">
          <label for="monto-a-pagar">Monto a Pagar</label>
          <input type="number" class="form-control" id="monto-a-pagar" v-model="monto_a_pagar" required>
        </div>
        <div class="form-group">
          <label for="observacion">Observación</label>
          <input type="text" class="form-control" id="observacion" v-model="observacion">
        </div>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <h6 class="card-category text-center text-gray">Métodos de Pago</h6>
            <br>
            <div class="row justify-content-center">
              <div class="col">
                <label>
                  <input type="checkbox" v-model="check_efectivo"> EFECTIVO
                </label>
              </div>
              <div class="col">
                <div v-if="check_gift_card">
                  <label class="bmd-label-floating">Monto</label>
                  <input type="text" class="form-control" v-model="gift_card_amount">
                </div>
                <label>
                  <input type="checkbox" v-model="check_gift_card"> GIFT CARD
                </label>
              </div>
              <div class="col">
                <div v-if="check_tarjeta">
                  <label class="bmd-label-floating">Número Tarjeta</label>
                  <input type="text" class="form-control" v-model="numero_tarjeta" @keyup="formatNumeroTarjeta" maxLength="19">
                </div>
                <label>
                  <input type="checkbox" v-model="check_tarjeta"> TARJETA
                </label>
              </div>
              <div class="col">
                <label>
                  <input type="checkbox" v-model="check_otros"> OTRO
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <b-button variant="secondary" @click="closeModal">Cerrar</b-button>
          <b-button type="submit" variant="primary">Enviar</b-button>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegistrarPagosModal',
  props: {
    pagoData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localPagoData: { ...this.pagoData },
      monto_a_pagar: 0,
      observacion: '',
      check_efectivo: false,
      check_gift_card: false,
      gift_card_amount: '',
      check_tarjeta: false,
      numero_tarjeta: '',
      check_otros: false
    };
  },
  watch: {
    pagoData: {
      immediate: true,
      deep: true,
      handler(newData) {
        this.localPagoData = { ...newData };
      }
    }
  },
  methods: {
    closeModal() {
      this.$bvModal.hide('registrar-pagos-modal');
    },
    resetModal() {
      this.localPagoData = { ...this.pagoData };
      this.monto_a_pagar = '';
      this.observacion = '';
      this.check_efectivo = false;
      this.check_gift_card = false;
      this.gift_card_amount = '';
      this.check_tarjeta = false;
      this.numero_tarjeta = '';
      this.check_otros = false;
    },
    async submitPago() {
      const pagoDetails = {
        ...this.localPagoData,
        monto_a_pagar: this.monto_a_pagar,
        observacion: this.observacion,
        metodo_pago: this.check_efectivo ? 1 : (this.check_gift_card ? 2 : (this.check_tarjeta ? 3 : (this.check_otros ? 4 : 0))),
        monto_gift_card: this.check_gift_card ? this.gift_card_amount : null,
        numero_tarjeta: this.check_tarjeta ? this.numero_tarjeta : null,
        monto_total: this.localPagoData.monto_total,
        monto_pagado: this.localPagoData.monto_pagado,
        monto_saldo: this.localPagoData.monto_saldo,
      };

      try {
        const response = await axios.post('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/realizar_pago/', pagoDetails);
        this.$emit('submit-success', response.data);
        this.closeModal();
      } catch (error) {
        console.error('Error submitting payment:', error);
      }
    },
    formatNumeroTarjeta(event) {
      let value = event.target.value.replace(/\D/g, '');
      let formattedValue = '';
      for (let i = 0; i < value.length; i += 4) {
        if (i > 0) {
          formattedValue += ' ';
        }
        formattedValue += value.substring(i, i + 4);
      }
      this.numero_tarjeta = formattedValue;
    }
  }
};
</script>

<style scoped>
/* Añadir estilos personalizados aquí si es necesario */
</style>
