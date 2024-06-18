<template>
  <div>
    <loading :isLoading="isLoading" style="z-index: 100%;"></loading>
    <div class="container-fluid">
      <template v-if="stateForm === 0">
        <div class="col-12 mt-3" v-if="!isLoading">
          <card :title="table.title" :subTitle="table.subTitle">
            <!-- <button class="btn btn-outline-success" type="button" @click="store()">Agregar</button> -->
            <div slot="raw-content" class="table-responsive">
              <table class="table" :class="tableClass">
                <thead>
                  <tr>
                    <th v-for="column in table.columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in proformas" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.fecha }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.nro_proforma }}</td>
                    <td>{{ item.total }}</td>

                    <td>

                      <button class="btn btn-outline-warning" type="button" @click="imprimir(item.id)">Imprimir</button>
                      <!-- <button class="btn btn-outline-danger" type="button" @click="eliminar(item._id)">Eliminar</button> -->
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
import Loading from "@/components/Loading.vue";
import toast from "vue-toast-notification";
const tableColumns = ["#", "Fecha", "Cliente","Nro de Orden", "Monto Total", "Opciones"];

export default {
  name: "Table-Proforma",
  props: {
    type: {
      type: String, // striped | hover
      default: "striped",
    },
  },
  components: {
    PaperTable,
    Loading
  },
  data() {
    return {
      activeTab: 'admin',
      table: {
        title: "Proformas",
        subTitle: "Lista de Proformas",
        columns: [...tableColumns],
        data: [],
      },
      proformas: [],
      stateForm: 0,
      isLoading: false,

      array_city: [],

      formData: {
        nit: "",
        // password:"",
        complement: "",
        name: "",
        ci: "",
        phone: "",
        address: "",
        city: "",
        email: "",
        city_id: 0,
        id_proforma: "",
      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getproforma() {
      try {
    this.isLoading = true;
    let resp = await axios.get("https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/proformas/");

    // Verificar si los datos son un array
    if (Array.isArray(resp.data) && resp.data.length > 0) {
        this.proformas = resp.data;
        console.log("datos para proformas ", resp.data);
        this.$toast.success("Proformas cargadas correctamente.");
    } else {
      this.$toast.warning("No hay Proformas registradas.");
    }
} catch (error) {
    this.$toast.error(`Error: ${error.message}`);
} finally {
    this.isLoading = false;
}

    },

    imprimir(id) {
      window.open('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_proforma/'+id,'Proforma','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600, top=50 , left=200');
    },

    Close() {
      this.stateForm = 0;
    },
    clearForm() {
      this.formData = {
        nit: "",
        // password:"",
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
    this.getproforma();
  },
};
</script>
