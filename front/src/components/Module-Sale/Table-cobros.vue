<template>
  <div>
    <loading :isLoading="isLoading" style="z-index: 1000px;"></loading> <!-- Aquí se agrega el componente Loading -->

    <div class="container-fluid">
      <template v-if="stateForm === 0">
        <div class="col-12 mt-3" v-if="!isLoading">
          <card :title="table.title" :subTitle="table.subTitle">
            <div slot="raw-content" class="table-responsive">
              <table class="table" :class="tableClass">
                <thead>
                  <tr>
                    <th v-for="column in table.columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cobros" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.nro_nota }}</td>
                    <td>{{ item.fecha }}</td>
                    <td>{{ item.monto_total }}</td>
                    <td>{{ item.a_cuenta }}</td>
                    <td>{{ item.saldo }}</td>
                    <td v-if="item.estado_pago == 1" style="color: red;">Debe</td>
                    <td v-if="item.estado_pago == 2" style="color: green;">Completado</td>
                    <td>
                      <button class="btn btn-outline-warning" type="button" @click="openHistorial(item.id)">Historial</button>
                      <!-- <button class="btn btn-outline-danger" type="button" @click="openRegistrarPagosModal(item)">Registrar Pagos</button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </template>
    </div>
    <history-modal ref="historyModal"></history-modal>
    <RegistrarPagosModal :pagoData="pagoData" @reset="resetRegistrarPagosModal" @submit-success="handlePagoSuccess" />
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";
import Loading from "@/components/Loading.vue";
import { inject, ref } from 'vue';
import RegistrarPagosModal from './RegistarPagosModal.vue';
import HistoryModal from './HistoryModal.vue';

const tableColumns = ["#", "Cliente", "Nota de venta", "Fecha", "Total", "Pagado", "Saldo", "Estado", "Opciones"];

export default {
  name: "Table-Cobros",
  props: {
    type: {
      type: String,
      default: "striped",
    },
  },
  components: {
    PaperTable,
    Loading,
    HistoryModal,
    RegistrarPagosModal
  },
  data() {
    return {
      isLoading: false,
      activeTab: 'admin',
      table: {
        title: "Cobros",
        subTitle: "Lista de Cobros",
        columns: [...tableColumns],
        data: [],
      },
      cobros: [],
      stateForm: 0,
      error: null,
      successMessage: null,
      array_city: [],
      formData: {
        nit: "",
        complement: "",
        name: "",
        ci: "",
        phone: "",
        address: "",
        city: "",
        email: "",
        city_id: 0,
        id_venta: "",
      },
      pagoData: {
        fecha_venta: '',
        nombre_cliente: '',
        monto_total: '',
        monto_pagado: '',
        monto_saldo: '',
        monto_a_pagar: '',
        observacion: '',
        metodo_pago: "",
        monto_gift_card: "",
        numero_tarjeta: "",
        payment_method_type_id: "",
        check_efectivo: false,
        check_tarjeta: false,
        check_otros: false,
        check_gift_card: false,
        gift_card_amount: 0,
        array_payment_method_type: [],
      },
    };
  },
  setup() {
    const setLoading = inject('setLoading');
    return { setLoading };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    openHistorial(id) {
      this.$refs.historyModal.openModal(id);
    },
    openRegistrarPagosModal(item) {
      this.pagoData = {
        ...this.pagoData,
        fecha_venta: item.fecha,
        nombre_cliente: item.name,
        monto_total: item.monto_total,
        monto_pagado: item.a_cuenta,
        monto_saldo: item.saldo,
        venta_id:item.id
      };
      this.$bvModal.show('registrar-pagos-modal');
    },
    resetRegistrarPagosModal() {
      this.pagoData = {
        fecha_venta: '',
        nombre_cliente: '',
        monto_total: '',
        monto_pagado: '',
        monto_saldo: '',
        monto_a_pagar: '',
        observacion: '',
        metodo_pago: "",
        monto_gift_card: "",
        numero_tarjeta: "",
        payment_method_type_id: "",
        check_efectivo: false,
        check_tarjeta: false,
        check_otros: false,
        check_gift_card: false,
        gift_card_amount: 0,
        array_payment_method_type: [],
      };
    },
    handlePagoSuccess() {
      console.log("Pago registrado con éxito");
    },
    async getVenta() {
      try {
        this.isLoading = true;
        let resp = await axios.get("https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/getPagos/");
        this.cobros = resp.data;
        this.$toast.success("Cobros cargados");
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async eliminar(id_venta) {
      try {
        this.isLoading = true;
        const resp = await axios.post(`https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/anular_nota_venta/${id_venta}/`);
        this.$toast.success(resp.data.message);
        setTimeout(() => this.getVenta(), 300);
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    imprimir(id) {
      window.open(`https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_nota_venta/${id}`, 'venta', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=800, height=600, top=50, left=200');
    },
    Close() {
      this.stateForm = 0;
    },
    clearForm() {
      this.formData = {
        nit: "",
        complement: "",
        name: "",
        ci: "",
        phone: "",
        address: "",
        city: "",
        email: "",
      };
    },
  },
  mounted() {
    this.getVenta();
  }
}
</script>
