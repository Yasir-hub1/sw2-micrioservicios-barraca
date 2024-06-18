<template>
  <div>
    <div class="container-fluid">
      <ul v-if="listado !== 1" class="nav nav-tabs d-flex flex-row-reverse bd-highlight" data-tabs="tabs">
        <li class="nav-item">
          <a class="btn btn-outline-warning bg-white" @click="change_list(1)" href="#" data-toggle="tab">
            <i class="material-icons"></i> Volver
            <div class="ripple-container"></div>
          </a>
        </li>
      </ul>
      <template v-if="listado == 1">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-tabs card-header-rose">
                <div class="nav-tabs-navigation">
                  <div class="nav-tabs-wrapper">
                    <span class="nav-tabs-title" style="font-size: 30px;">Registro de material</span>
                    <ul class="nav nav-tabs d-flex flex-row-reverse bd-highlight" data-tabs="tabs">
                      <!--<li class="nav-item">
                                              <a class="btn btn-outline-warning bg-white"
                                                      @click="open_form('customer','store')"
                                                      href="#" data-toggle="tab">
                                                  <i class="material-icons">add_circle</i> Registrar especie
                                                  <div class="ripple-container"></div>
                                              </a>
                                          </li>-->
                      <li class="nav-item">
                        <a class="btn btn-outline-warning bg-white" @click="change_list(2)" href="#" data-toggle="tab">
                          <i class="material-icons"></i> Registrar romaneo
                          <div class="ripple-container"></div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="btn btn-outline-warning bg-white" @click="change_list(3)" href="#" data-toggle="tab">
                          <i class="material-icons"></i> Especies
                          <div class="ripple-container"></div>
                        </a>
                      </li>
                      <!-- <li class="nav-item">
                                              <a type="button" class="btn btn-outline-warning bg-white"
                                                      @click="open_form('customer','store')"
                                                      href="#" data-toggle="tab">
                                                  <i class="material-icons">visibility</i> Ver Romaneo
                                                  <div class="ripple-container"></div>
                                              </a>
                                          </li>-->
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="toolbar">
                </div>
                <table class="table" :class="tableClass">
                  <thead>
                    <tr>
                      <th v-for="column in table.columns" :key="column">{{ column }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in productos" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ getEspecieName(item.especieId) }}</td>
                      <td>{{ item.espesor }}</td>
                      <td>{{ item.ancho }}</td>
                      <td>{{ item.largo }}</td>
                      <td>{{ item.cantidad }}</td>
                      <td>{{ item.cantidad_pies }}</td>

                      <td>
                        <button class="btn btn-outline-warning" type="button"
                          @click="openModal('Incrementar', item)">Incrementar</button>
                        <button class="btn btn-outline-danger" type="button"
                          @click="openModal('Decrementar', item)">Decrementar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <CustomModal v-if="selectedItem" @incremento="incrementoCantidad" @decrementar="decrementoCantidad" @message="messageError"
                  :action="action" :itemData="selectedItem" @save="handleSave" :opciones_especies="opciones_especies">
                </CustomModal>
              </div>
              <!-- end content-->
            </div>
            <!--  end card  -->
          </div>
          <!-- end col-md-12 -->

        </div>
      </template>

      <template v-if="listado == 2">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-text card-header-warning">
                <div class="card-text">
                  <h4 class="card-title" v-text="modal_title"></h4>
                  <p class="card-category">Gestion de ingreso de material (Romaneo)</p>
                </div>
              </div>
              <div class="card-body">
                <form method="post" class="form-horizontal" v-on:submit.prevent="store_romaneo()">
                  <div class="row justify-content-center mt-3">
                    <div class="col-md-4">
                      <div class="form-group bmd-form-group is-filled"
                        v-bind:class="{ 'has-danger is-focused': errors.descripcion }">
                        <label class="bmd-label-floating">Descripcion</label>
                        <input class="form-control" v-model="descripcion" />
                        <span class="text-error" v-if="errors.descripcion">{{ errors.descripcion[0] }}</span>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group bmd-form-group is-filled"
                        v-bind:class="{ 'has-danger is-focused': errors.fecha_registro }">
                        <label class="bmd-label-floating">Fecha Registro</label>
                        <input type="date" class="form-control" v-model="fecha_registro">
                        <span class="text-error" v-if="errors.fecha_registro">{{ errors.fecha_registro[0] }}</span>
                      </div>
                    </div>

                  </div>
                  <div class="row">
                    <div class="table-responsive">
                      <div class="form-group">
                        <div class="d-flex flex-column">
                          <table id="lista_material2" class="table table-bordered table-striped">
                            <thead>
                              <th class="text-center"><b>OP.</b></th>
                              <th class="text-center w-25"><b>ESPECIES</b></th>
                              <th class="text-center"><b>ESPESOR [pulgada]</b></th>
                              <th class="text-center"><b>ANCHO [pulgada]</b></th>
                              <th class="text-center"><b>LARGO [pie]</b></th>
                              <th class="text-center"><b>CANTIDAD [unidad]</b></th>
                              <!--                                        <th class="text-center"><b>CANTIDAD [unidad]</b></th>-->
                              <!--                                        <th class="text-center"><b>CANTIDAD [pie]</b></th>-->
                            </thead>
                            <tbody>
                              <tr v-for="(elemento, index) in lista_romaneo">
                                <td><input class="" type="checkbox" v-model="elemento.seleccionado" /></td>
                                <td>
                                  <select data-size="7" data-style="btn btn-primary btn-round"
                                    title="Seleccione Especie" class="selectpicker m-1 p-1 w-75" tabindex="-98"
                                    v-model="elemento.especie">
                                    <option disabled="disabled" selected>Seleccione especie</option>
                                    <option v-for="opcion in opciones_especies" :value="opcion.id">{{ opcion.nombre }}
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  <div class="input-group bmd-form-group is-filled mb-4">
                                    <input class="form-control text-center" type="text" v-model="elemento.espesor" />
                                  </div>
                                </td>
                                <td>
                                  <div class="input-group bmd-form-group is-filled mb-4">
                                    <input class="form-control text-center" type="text" v-model="elemento.ancho" />
                                  </div>
                                </td>
                                <td>
                                  <div class="input-group bmd-form-group is-filled mb-4">
                                    <input class="form-control text-center" type="text" v-model="elemento.largo" />
                                  </div>
                                </td>
                                <td>
                                  <div class="input-group bmd-form-group is-filled mb-4">
                                    <input class="form-control text-center" type="number" :rules="elemento.cantidad > 0"
                                      v-model="elemento.cantidad" @input="validar_cantidad(index)" step="any" />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col d-flex justify-content-center">
                          <button class="btn btn-success btn-sm" type="button" @click="add_row()">
                            <i class="material-icons">add</i> Agregar fila
                          </button>
                          <button class="btn btn-danger btn-sm" type="button" @click="delete_row()">
                            <i class="material-icons">delete</i> Eliminar fila
                          </button>
                        </div>
                        <div class="col-lg-2" hidden>
                          <button class="btn btn-danger" type="button" @click="getValores()"><i class="fa fa-trash"></i>
                            Eliminar
                            valores
                          </button>
                        </div>
                        <hr>
                        <div class="col d-flex">
                          <button class="btn btn-primary btn-sm" type="submit">
                            <i class="material-icons"></i> Guardar
                          </button>
                          <button class="btn btn-danger btn-sm" type="button" @click.prevent="leave_form()">
                            <i class="material-icons"></i> Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="listado == 3">
        <TableEspecie></TableEspecie>
      </template>

    </div>


  </div>
</template>

<script>

// import VueTable from './enso/vuedatatable/VueTable.vue';
import { commonMixin } from './common_mixin.js';
import axios from "axios";
import moment from 'moment';
const tableColumns = ["#", "Especie", "Espesor", "Ancho", "Largo", "Cantidad(Uni)", "Cantidad(ft2)", "Opciones"];
import { PaperTable } from "@/components";
import CustomModal from '../components/Module-Inventory/CustomModal.vue';

import TableEspecie from '../components/Module-Inventory/Table-especie.vue';
export default {
  mixins: [commonMixin],
  props: {
    type: {
      type: String, // striped | hover
      default: "striped",
    },
  },
  data() {
    return {
      table: {
        title: "Clientes",
        subTitle: "Administra tus clientes",
        columns: [...tableColumns],
        data: [],
      },
      items: [
        // Tu array de items aquí
      ],
      selectedItem: null,
      action: '',


      lista_romaneo: [{ "especie": "", "espesor": "", "largo": "", "ancho": "", "cantidad": 0, "seleccionado": false }],
      opciones_especies: [],
      descripcion: "",
      fecha_registro: moment(new Date(), "DD/MM/YYYY").format("YYYY-MM-DD"),
      test: "test",
      id_producto: "",
      especie: "",
      espesor: "",
      ancho: "",
      largo: "",
      cantidad_actual: "",
      cantidad_entrante: "",
      observacion: "",
      search: "",
      modal_title: "",
      listado: 1,
      modal: 0,
      modal2: 0,
      productos: [],

      criterion: "name",
      pagination: {
        total: 0,
        current_page: 0,
        per_page: 0,
        last_page: 0,
        from: 0,
        to: 0
      },
      offset: 3,
      errors: [],
      activeOptions: [
        { value: true, label: 'check', class: 'has-text-success' },
        { value: false, label: 'times', class: 'has-text-danger' },
      ],
      seniorityOptions: [
        { id: 1, name: 'Assistant' },
        { id: 2, name: 'Associate' },
        { id: 3, name: 'Staff Member' },
        { id: 4, name: 'Senior' },
        { id: 5, name: 'Partner' },
      ],
      filters: {
        examples: {
          is_active: null,
          seniority: [],
        },
      },
      intervals: {
        examples: {
          hired_at: {
            min: null,
            max: null,
            dbDateFormat: 'Y-m-d',
          },
          salary: {
            min: null,
            max: null,
          },
        },
      }
    };
  },
  updated: function () {

  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
    isActived: function () {
      return this.pagination.current_page;
    },
    //Calcula los elementos de la paginación
    pagesNumber: function () {
      if (!this.pagination.to) {
        return [];
      }

      var from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }

      var to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }
      return pagesArray;
    }
  },
  components: { PaperTable, CustomModal, TableEspecie },
  methods: {
    openModal(action, item) {
      this.action = action;
      this.selectedItem = item;
      this.$root.$emit('bv::show::modal', 'custom-modal');
    },
    handleSave(formData) {
      if (this.action === 'Incrementar') {
        formData.cantidad += formData.cantidadAjuste;
      } else if (this.action === 'Decrementar') {
        formData.cantidad -= formData.cantidadAjuste;
      }
      // Actualizar la cantidad en tu array de items
      const index = this.items.findIndex(item => item._id === formData._id);
      if (index !== -1) {
        this.$set(this.items, index, formData);
      }
      this.$root.$emit('bv::hide::modal', 'custom-modal');
    },
    validar_cantidad(index) {
      let fila = this.lista_romaneo[index];
      if (fila.cantidad == "" || fila.cantidad < 0) {
        fila.cantidad = 0;
      }
    },
    getEspecieName(especieID) {
      const especie = this.opciones_especies.find(especie => especie.id === especieID);
      return especie ? especie.nombre : 'Especie no encontrada';
    },
    send_form_data(action) {
      if (action == "INC") {
        this.send_incrementar();
      }
      else if (action == "DEC") {
        this.send_decrementar();
      }
    },

    close_form() {
      this.form_title = "";
      this.synchronized = "";
      this.errors = [];
      this.especie = "";
      this.espesor = "";
      this.ancho = "";
      this.largo = "";
      this.cantidad_actual = "";
      this.cantidad_entrante = "";
      this.observacion = "";
      this.listado = 1;
      this.modal = 0;
      this.modal2 = 0;
    },

    open_form(action, row) {
      this.id = row["dtRowId"];

      this.especie = row["especie_nombre"];
      this.espesor = row["espesor"];
      this.ancho = row["ancho"];
      this.largo = row["largo"];
      this.cantidad_actual = row["cantidad"];
      switch (action) {
        case "incrementar":
          this.modal_title = "Incrementa la cantidad de su material.";
          //this.cantidad_entrante=row["nombre_especie"];
          //this.observacion=row["nombre_especie"];
          this.modal = 1;
          break;

        case "decrementar": {
          this.modal_title = "Decrementar la cantidad de su material.";
          //this.cantidad_entrante=row["nombre_especie"];
          //this.observacion=row["nombre_especie"];
          this.modal2 = 1;
          break;
        }
      }
    },
    change_list(numeroDeLista) {
      this.listado = numeroDeLista;
      this.getEspecies();
    },
    cerrar_modal_romaneo() {
      $('#modal_romaneo').modal('hide'); // cerrar
    },
    add_row() {
      this.lista_romaneo.push({ "especie": "", "espesor": "", "largo": "", "ancho": "", "cantidad": 0, "seleccionado": false });
    }, delete_row() {
      this.lista_romaneo = this.lista_romaneo.filter(elemento => !elemento.seleccionado);
    }, getValores() {
      const espesor = this.lista_romaneo.map(ele => ele.espesor);
      const largo = this.lista_romaneo.map(ele => ele.largo);
      const ancho = this.lista_romaneo.map(ele => ele.ancho);
      const especie = this.lista_romaneo.map(ele => ele.especie);

      console.log(largo);
      console.log(espesor);
      console.log(ancho);
      console.log(especie);
    },
    async store_romaneo() {
      const espesor = this.lista_romaneo.map(ele => ele.espesor);
      const largo = this.lista_romaneo.map(ele => ele.largo);
      const ancho = this.lista_romaneo.map(ele => ele.ancho);
      const especie = this.lista_romaneo.map(ele => ele.especie);
      const cantidad = this.lista_romaneo.map(ele => ele.cantidad);


      if (Object.entries(this.lista_romaneo).length === 0) {

        this.$toast.error("Debe haber por lo menos una fila con datos en la tabla.")
        return;
      }
      for (let i = 0; i < espesor.length; i++) {
        if (especie[i] == '' || espesor[i] == '' || largo[i] == '' || ancho[i] == '' || cantidad[i] == 0) {

          this.$toast.error("Datos de la tabla sin rellenar.")
          return;
        }
      }
      // me.$refs.loading.start("Registrando Romaneo");
      try {
        await axios
        .post("https://msinventario-zgaud6cq5q-uc.a.run.app/api/romaneo", {
          especie_id: especie,
          espesor,
          largo,
          ancho,
          cantidad,
          descripcion: this.descripcion,
          fecha_registro: this.fecha_registro,
          total_pie_cuadrado: 0.0,
          cantidad_unidad: 0
        })
        this.$toast.success("El romaneo fue registrado con exito.")
          this.leave_form();
          this.getListProduct();
      } catch (error) {
        this.$toast.error("Error al registrar el Romaneo!")
      }










    },
    leave_form() {
      this.lista_romaneo = [{ "especie": "", "espesor": "", "largo": "", "ancho": "", "seleccionado": false }];
      this.errors = [];
      this.listado = 1;
      this.descripcion = "";
      this.fecha_registro = moment(new Date(), "DD/MM/YYYY").format("YYYY-MM-DD");
    },
    getListProduct() {
      axios.get("https://msinventario-zgaud6cq5q-uc.a.run.app/api/productos")
        .then(response => {
          this.productos = response.data; // Asignar datos de opciones del select
          console.log(this.productos);
        })
        .catch(error => {
          console.error(error);
        });
    },
    incrementoCantidad(data) {
      console.log("INCREMENTA ", data)
      this.$toast.success(data);
      this.getListProduct()
    },
    decrementoCantidad(data) {
      console.log("DECREMENTA ", data)
      this.$toast.success(data);
      this.getListProduct()
    },
    messageError(data){
      this.$toast.error(data);
    },
    getEspecies(){
      axios.get('https://msinventario-zgaud6cq5q-uc.a.run.app/api/especies')
      .then(response => {
        this.opciones_especies = response.data; // Asignar datos de opciones del select
        console.log(this.opciones_especies);
      })
      .catch(error => {
        console.error(error);
      });
    },

  },

  mounted() {
    this.getEspecies()
    this.getListProduct()


  }
};
</script>

<style>
.modal-content {
  width: 100% !important;
  position: absolute !important;
}

.mostrar {
  display: block !important;

}

.div-error {
  display: flex;
  justify-content: center;
}

.text-error {
  color: red !important;
  font-weight: bold;
}
</style>
