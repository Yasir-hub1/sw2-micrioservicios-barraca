<template>
  <div>
    <div class="container-fluid">
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
                  <tr v-for="(item, index) in Especies" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.precio }}</td>

                    <td>

                      <button class="btn btn-outline-warning" type="button" @click="edit(item)">Editar</button>
                      <!-- <button class="btn btn-outline-danger" type="button" @click="eliminar(item.id)">Eliminar</button> -->
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
          <card title="Agregar Especie">
            <div slot="raw-content">
              <form @submit.prevent="send_form_data">

                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required>
                </div>



                <div class="form-group">
                  <label for="descripcion">Descripcion</label>
                  <input type="text" class="form-control" id="descripcion" v-model="formData.descripcion" required>
                </div>

                <div class="form-group">
                  <label for="phone">Precio</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.precio" required>
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
          <card title="Actualizar Especie">
            <div slot="raw-content">
              <form @submit.prevent="send_form_data">

                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required>
                </div>



                <div class="form-group">
                  <label for="descripcion">Descripcion</label>
                  <input type="text" class="form-control" id="descripcion" v-model="formData.descripcion" required>
                </div>


                <div class="form-group">
                  <label for="phone">Precio</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.precio" required>
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
    </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";
const tableColumns = ["#", "Nombre", "Descipcion", "Precio", "Opciones"];

export default {
  precio: "Table-Especie",
  props: {
    type: {
      type: String, // striped | hover
      default: "striped",
    },
  },
  components: {
    PaperTable
  },
  data() {
    return {
      activeTab: 'admin',
      table: {
        title: "Especies",
        subTitle: "Administra tus especies",
        columns: [...tableColumns],
        data: [],
      },
      Especies: [],
      stateForm: 0,

      array_city: [],



      formData: {
        nombre: "",
        // password:"",
        descripcion: "",
        precio: "",

        city_id: 0,
        id_Especie: "",

      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getEspecie() {

      try {
        let resp = await axios.get("https://msinventario-zgaud6cq5q-uc.a.run.app/api/especies");
        this.Especies = resp.data;
        console.log("datos para Especies ", resp.data)
        // this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },


    edit(row) {
      this.stateForm = 2,
        this.openForm('Especie', 'update', row);
    },
    store() {
      this.stateForm = 1,
        this.openForm('Especie', 'store');
    },
    eliminar(id_Especie) {
      try {
        let resp = axios.post("/Especie-delete", { id: id_Especie })
        console.log("elimimnado ", resp.data);
        this.$toast.success("Especie Eliminada");
        this.getEspecie();
      } catch (error) {
        this.$toast.error(error.message);
      }

    },
    async store_Especie() {
      try {
        await axios
          .post("https://msinventario-zgaud6cq5q-uc.a.run.app/api/especies", {

            precio: this.formData.precio,
            nombre: this.formData.nombre,
            descripcion: this.formData.descripcion,

          })
        this.$toast.success("Especie Creada");
        this.stateForm = 0;
        this.clearForm();
        this.getEspecie();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async update_Especie() {
      try {
       await axios.put(`https://msinventario-zgaud6cq5q-uc.a.run.app/api/especies/${this.formData.id_Especie}`, {
          precio: this.formData.precio,
          nombre: this.formData.nombre,
          descripcion: this.formData.descripcion,
        });
        this.$toast.success("Especie Actualizada");
        this.clearForm();
        this.getEspecie();

        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    send_form_data() {
      if (this.stateForm == 1) {
        this.store_Especie();
      }
      else if (this.stateForm == 2) {
        this.update_Especie();
      }
    },
    openForm(model, action, data = []) {
      console.log("datos para editar ", data,action,model)
      switch (model) {
        case "Especie": {
          switch (action) {
            case "store": {

              this.formData.nombre = "";
              this.formData.precio = "";


              this.formData.descripcion = "";

              this.action_type = 1;
              this.listado = 2;
              break;
            }
            case "update": {

              this.formData.id_Especie = data['id'];
              this.formData.precio = data["precio"];
              this.formData.nombre = data["nombre"];

              this.formData.descripcion = data["descripcion"];



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
        nombre: "",
        // password:"",
        descripcion: "",
        precio: "",



      }
    },
  },
  mounted() {
    this.getEspecie();

  },
};
</script>
