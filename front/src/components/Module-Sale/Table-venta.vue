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
                  <tr v-for="(item, index) in ventas" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.nro_nota }}</td>
                    <td>{{ item.fecha }}</td>
                    <td>{{ item.nro_despacho }}</td>
                    <td>{{ item.name }}</td>

                    <td>{{ item.total }}</td>

                    <td>

                      <button class="btn btn-outline-warning" type="button" @click="imprimir(item.id)">Imprimir</button>
                      <button class="btn btn-outline-danger" type="button" @click="eliminar(item.id)">Anular </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </template>
    </div>
  </div>
</template>



<script>
import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";
import Loading from "@/components/Loading.vue"; // Importar el componente Loading
import { inject } from 'vue';
const tableColumns = ["#", "Orden De Pedido", "Fecha", "Nro de Orden de trabajo", "Cliente", "Monto Total", "Opciones"];
export default {
  name: "Table-Venta",
  props: {
    type: {
      type: String,
      default: "striped",
    },
  },
  components: {
    PaperTable,
    Loading // Registrar el componente Loading
  },
  data() {
    return {
      isLoading: false, // Agregar isLoading para controlar el estado de carga
      activeTab: 'admin',
      table: {
        title: "Ventas",
        subTitle: "Lista de Ventas",
        columns: [...tableColumns],
        data: [],
      },
      ventas: [],
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
      }
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
    async getVenta() {
  try {
    this.isLoading = true; // Establecer isLoading a true al comenzar la solicitud
    let resp = await axios.get("https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/ventas/");

    if (Array.isArray(resp.data) && resp.data.length > 0) {
      this.ventas = resp.data;
      this.$toast.success("Ventas cargadas correctamente.");
    } else {
      this.$toast.warning("No hay Ventas registradas.");
    }
  } catch (error) {
    this.$toast.error(`Error: ${error.message}`);
  } finally {
    this.isLoading = false; // Establecer isLoading a false al finalizar la solicitud
  }
},

    async eliminar(id_venta) {
      try {
        this.isLoading = true; // Establecer isLoading a true al comenzar la solicitud
        const resp = await axios.post(`https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/anular_nota_venta/${id_venta}/`);
        this.$toast.success(resp.data.message);
        setTimeout(() =>
          this.getVenta()

          , 300)
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false; // Establecer isLoading a false al finalizar la solicitud
      }
    },
    imprimir(id) {
      window.open('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_nota_venta/' + id, 'venta', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600, top=50 , left=200');
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
      }
    },
  },
  mounted() {
    // this.setLoading(true); // Activar el estado de carga al montar el componente
    this.getVenta();
  }
}
</script>
