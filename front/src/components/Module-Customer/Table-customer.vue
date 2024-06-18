<template>
  <div>
    <div class="container-fluid">
      <loading :isLoading="isLoading"></loading>
        <template v-if="!isLoading">

      <template v-if="stateForm === 0">
        <div class="col-12 mt-3">
          <card :title="table.title" :subTitle="table.subTitle">
            <button class="btn btn-outline-success" type="button" @click="store()">Agregar</button>
            <div slot="raw-content" class="table-responsive">
              <table class="table" :class="tableClass">
                <thead>
                  <tr>
                    <th v-for="column in table.columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in customers" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.ci }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.address }}</td>
                    <td>{{ item.nit }}</td>
                    <td>{{ getCityName(item.city_id) }}</td>


                    <td>

                      <button class="btn btn-outline-warning" type="button" @click="edit(item)">Editar</button>
                      <button class="btn btn-outline-danger" type="button" @click="eliminar(item._id)">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>

      </template>


      <template v-if="stateForm === 1">
        <div class="container mt-3">
          <card title="Agregar Datos">
            <div slot="raw-content">
              <form @submit.prevent="send_form_data">
                <div class="form-group">
                  <label for="name">Nombre</label>
                  <input type="text" class="form-control" id="name" v-model="formData.name" required>
                </div>
                <div class="form-group">
                  <label for="nit">NIT</label>
                  <input type="text" class="form-control" id="nit" v-model="formData.nit" required>
                </div>

                <div class="form-group">
                  <label for="ci">CI</label>
                  <input type="text" class="form-control" id="ci" v-model="formData.ci" required>
                </div>

                <div class="form-group">
                  <label for="complement">Complemento</label>
                  <input type="text" class="form-control" id="complement" v-model="formData.complement" required>
                </div>

                <div class="form-group">
                  <label for="phone">Teléfono</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.phone" required>
                </div>
                <div class="form-group">
                  <label for="address">Dirección</label>
                  <input type="text" class="form-control" id="address" v-model="formData.address" required>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="address" v-model="formData.email" required>
                </div>

                <div class="col-md-3">
                  <div class="dropdown bootstrap-select show">
                    <label for="address">Ciudad</label>
                    <select data-size="7" class="selectpicker" data-style="btn btn-primary btn-round"
                      title="Seleccione Ciudad" tabindex="-98" v-model="formData.city_id">
                      <option v-for="city in array_city" :key="city._id" :value="city._id" v-text="city.name"></option>
                    </select>

                  </div>
                </div>
                <div style="flex-direction: row">

                  <button type="submit" class="btn btn-primary">Guardar</button>

                  <button type="input" class="btn btn-secundary" @click="Close()">Cancelar</button>
                </div>

              </form>
            </div>
          </card>
        </div>
      </template>



      <template v-if="stateForm === 2">
        <div class="container mt-3">
          <card title="Actualizar Datos">
            <div slot="raw-content">
              <form @submit.prevent="send_form_data">
                <div class="form-group">
                  <label for="name">Nombre</label>
                  <input type="text" class="form-control" id="name" v-model="formData.name" required>
                </div>
                <div class="form-group">
                  <label for="nit">NIT</label>
                  <input type="text" class="form-control" id="nit" v-model="formData.nit" required>
                </div>

                <div class="form-group">
                  <label for="ci">CI</label>
                  <input type="text" class="form-control" id="ci" v-model="formData.ci" required>
                </div>

                <div class="form-group">
                  <label for="complement">Complemento</label>
                  <input type="text" class="form-control" id="complement" v-model="formData.complement" required>
                </div>


                <div class="form-group">
                  <label for="phone">Teléfono</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.phone" required>
                </div>

                <div class="form-group">
                  <label for="address">Dirección</label>
                  <input type="text" class="form-control" id="address" v-model="formData.address" required>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" v-model="formData.email" required>
                </div>

                <div class="col-md-3">
                  <div class="dropdown bootstrap-select show">
                    <label for="address">Ciudad</label>
                    <select data-size="7" class="selectpicker" data-style="btn btn-primary btn-round"
                      title="Seleccione Ciudad" tabindex="-98" v-model="formData.city_id">
                      <option v-for="city in array_city" :key="city._id" :value="city._id" v-text="city.name"></option>
                    </select>

                  </div>
                </div>


                <div style="flex-direction: row">

                  <button type="submit" class="btn btn-primary">Guardar</button>

                  <button type="input" class="btn btn-secundary" @click="Close()">Cancelar</button>
                </div>
              </form>
            </div>
          </card>
        </div>
      </template>
    </template>

    </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";
const tableColumns = ["#", "name", "CI", "phone", "Direccion", "Nit", "Ciudad", "Opciones"];
import Loading from "../Loading.vue";

export default {
  name: "Table-Customer",
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
        title: "Clientes",
        subTitle: "Administra tus clientes",
        columns: [...tableColumns],
        data: [],
      },
      customers: [],
      stateForm: 0,

      array_city: [],
      isLoading: false,



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
        id_customer: "",

      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getCustomer() {

      try {
        this.isLoading = true;
        let resp = await axios.get("http://3.139.103.136/api/customers");
        this.customers = resp.data.data;
        console.log("datos para customers ", resp.data.data)
        // this.$toast.success("Lista de clientes");
      } catch (error) {
        this.$toast.error(error.message);
      }finally {
        this.isLoading = false;
      }
    },
    async getCities() {
      try {
        this.isLoading = true;
        let resp = await axios.get("http://3.139.103.136/api/city");
        console.log("datos para citeis ", resp.data)
        this.array_city = resp.data.data;

      } catch (error) {
        this.$toast.error(error.message);
      }finally {
        this.isLoading = false;
      }
    },
    getCityName(cityId) {
      const city = this.array_city.find(city => city._id === cityId);
      return city ? city.name : 'Ciudad no encontrada';
    },
    edit(row) {
      this.stateForm = 2,
        this.openForm('customer', 'update', row);
    },
    store() {
      this.stateForm = 1,
        this.openForm('customer', 'store');
    },
   async eliminar(id_customer) {
      try {
        this.isLoading = true;
        let resp = await axios.post("http://3.139.103.136/api/customer-delete", {id:id_customer})
              console.log("elimimnado ",resp.data);
              this.$toast.success("Eliminado con Exito");
              this.getCustomer();
      } catch (error) {
        this.$toast.error(error.message);
      }finally {
        this.isLoading = false;
      }

    },
    async store_customer() {
      try {
        this.isLoading = true;
        let res = await axios
          .post("http://3.139.103.136/api/customer", {

            name: this.formData.name,
            nit: this.formData.nit,
            ci: this.formData.ci,
            phone: this.formData.phone,
            address: this.formData.address,
            email: this.formData.email,
            complement: this.formData.complement,

            city_id: this.formData.city_id,

          })
        this.$toast.success(res.data.message);
        this.stateForm = 0;
        this.clearForm();
        this.getCustomer();
      } catch (error) {
        this.$toast.error(error.message);
      }finally {
        this.isLoading = false;
      }
    },
    async update_customer() {
      try {
        let res = await axios
          .put("http://3.139.103.136/api/customer-update", {
            id: this.formData.id_customer,
            name: this.formData.name,
            nit: this.formData.nit,
            ci: this.formData.ci,
            phone: this.formData.phone,
            address: this.formData.address,
            complement: this.formData.complement,
            email: this.formData.email,
            city_id: this.formData.city_id,

          })
        this.$toast.success(res.data.message);
        this.getCustomer();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }



    },
    send_form_data() {
      if (this.stateForm == 1) {
        this.store_customer();
      }
      else if (this.stateForm == 2) {
        this.update_customer();
      }
    },
    openForm(model, action, data = []) {
      console.log("datos para editar ", data)
      switch (model) {
        case "customer": {
          switch (action) {
            case "store": {

              this.formData.nit = "";
              this.formData.name = "";

              this.formData.ci = "";
              this.formData.complement = "";
              this.formData.phone = "";

              this.formData.address = "";
              this.formData.email = "";

              this.formData.city = "";
              this.formData.city_id = 0;
              this.formData.id_customer = "";

              this.action_type = 1;
              this.listado = 2;
              break;
            }
            case "update": {

              this.formData.id_customer = data['_id'];
              this.formData.name = data["name"];
              this.formData.nit = data["nit"];
              // this.formData.password = '';
              this.formData.ci = data["ci"];
              this.formData.phone = data["phone"];
              this.formData.address = data["address"];
              this.formData.city = this.getCities(data["city_id"]);
              this.formData.complement = data["complement"];
              this.formData.email = data["email"];
              this.formData.city_id = data["city_id"];


              break;
            }

          }

        }
      }
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
    this.getCustomer();
    this.getCities();
  },
};
</script>
