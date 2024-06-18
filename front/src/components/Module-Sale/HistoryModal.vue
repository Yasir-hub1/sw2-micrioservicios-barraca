<template>
  <b-modal id="history-modal" title="Historial" @hide="resetModal" size="xl">
    <div class="modal-body">
      <b-table :items="historial" :fields="fields" responsive="sm">
        <!-- Index Column -->
        <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <!-- Nro Recibo -->
          <template #cell(nro_recibo)="data">
            {{ data.item.nro_recibo }}
          </template>
          <!-- Fecha Pago -->
          <template #cell(fecha_pago)="data">
            {{ data.item.fecha_pago }}
          </template>
          <!-- Metodo Pago -->
          <template #cell(tipo_pago)="data">

            {{ data.item.tipo_pago==1?"Efectivo":(data.item.tipo_pago==2?"Gift Card":(data.item.tipo_pago==3?"Tarjeta":"Otro")) }}
          </template>
          <!-- Monto Venta -->
          <template #cell(monto_total)="data">
            {{ data.item.monto_total }}
          </template>
          <!-- Monto Pagado -->
          <template #cell(monto_pagado)="data">
            {{ data.item.monto_pagado }}
          </template>
          <!-- Monto Saldo -->
          <template #cell(monto_saldo)="data">
            {{ data.item.monto_saldo }}
          </template>
          <!-- Observaciones -->
          <template #cell(observacion)="data">
            {{ data.item.observacion }}
          </template>

           <!-- Observaciones -->
           <template #cell(venta_id)="data">
            {{  }}
            <button class="btn btn-outline-warning" type="button" @click="openRecibo(data.item.nro_recibo)">Imprimir</button>
          </template>
      </b-table>
    </div>
  <!--   <div class="modal-footer">
      <b-button variant="secondary" @click="closeModal">Cerrar</b-button>
    </div> -->
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HistoryModal',
  data() {
    return {
      historial: [],
      fields: [
        { key: 'index', label: '#' },
        { key: 'nro_recibo', label: 'Nro Recibo' },
        { key: 'fecha_pago', label: 'Fecha Pago' },
        { key: 'tipo_pago', label: 'Metodo Pago' },
        { key: 'monto_total', label: 'Monto Venta ' },
        { key: 'monto_pagado', label: 'Monto Pagado' },
        { key: 'monto_saldo', label: 'Monto Saldo' },
        { key: 'observacion', label: 'Observaciones' },
        { key: 'venta_id', label: 'Opciones' }
      ]
    };
  },
  methods: {
    async fetchHistorial(id) {
      try {
        let response = await axios.get(`https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/pagos_x_venta/${id}`);
        this.historial = response.data.pagos;
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    },
    openModal(id) {
      this.fetchHistorial(id);
      this.$bvModal.show('history-modal');
    },
    closeModal() {
      this.$bvModal.hide('history-modal');
    },
    resetModal() {
      this.historial = [];
    },
    openRecibo(nro_recibo) {
      window.open('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_pago/'+nro_recibo,'Nota Venta','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600, top=50 , left=200');

    },
  }
};
</script>
