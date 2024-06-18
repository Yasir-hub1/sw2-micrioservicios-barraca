<template>
  <div>

    <div class="row">
      <div class="col-2" v-if="listado!=2">
 <div class="d-flex justify-content-center">
                      <b-button  @click="typeLista(2)" variant="success">CREAR VENTA</b-button>
                    </div>
                  </div>
    <div class="col-3">
                 <div class="d-flex justify-content-center">
                <b-button  @click="typeLista(3)" variant="danger"> LISTA DE PROFORMAS</b-button>
                </div>
            </div>
        <div class="col-3">
          <div class="d-flex justify-content-center">
                      <b-button  @click="typeLista(4)" variant="warning">LISTA DE VENTAS</b-button>
              </div>
          </div>

          <div class="col-3">
          <div class="d-flex justify-content-center">
                      <b-button  @click="typeLista(5)" variant="info">LISTA DE COBROS</b-button>
              </div>
          </div>



                </div>
    <div class="container-fluid">
      <template v-if="listado == 1">
        <div class="row">
          <div class="col-10">
            <div class="card">
              <div class="card-header card-header-text card-header-warning">
                <div class="card-text">
                  <h4 class="card-title">REGISTRO VENTAS</h4>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h1></h1>
                    <button class="btn btn-success btn-sm" type="button" @click="cambiar_vista('materia_prima')">
                      <i class="material-icons"></i> MATERIA PRIMA
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </template>


      <template v-if="listado == 2">
        <loading :isLoading="isLoading"></loading>
        <div class="row">
          <div class="col-xl-8 col-sm">
            <div class="card" style="width: 120%;right: 4%;">
              <div class="card-header card-header-text card-header-warning">
                <div class="card-text">
                  <h4 class="card-title"> VENTA DE MATERIA PRIMA</h4>
                </div>
              </div>
              <div class="card-body">
                <form method="post" class="form-horizontal" v-on:submit.prevent="send_form_data()">

                  <div class="row">
                    <div class="col-4">
                      <div class="form-group bmd-form-group is-filled"
                        v-bind:class="{ 'has-danger is-focused': errors.nit_customer, ' is-focused ': search_nit }">
                        <label class="bmd-label-floating">Nit Cliente</label>
                        <autocomplete :url="'http://3.139.103.136/api/customer/autocomplete_customer'"
                          :params_show="['nit', 'name']" :params_label="['Nit', 'Nombre']" :label="'nit'"
                          ref="autocomplete_nit" v-bind:data="search_nit" :validation="'number'"
                          @clickedSomething:change="autocomplete_nit" @not_exist_data="not_exist_nit_customer">
                        </autocomplete>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group bmd-form-group is-filled"
                        v-bind:class="{ 'has-danger is-focused': errors.name_customer, ' is-focused ': search_name }">
                        <label class="bmd-label-floating">Nombre Cliente</label>
                        <autocomplete :url="'http://3.139.103.136/api/customer/autocomplete_customer'"
                          :params_show="['nit', 'name']" :params_label="['Nit', 'Nombre']" :label="'name'"
                          ref="autocomplete_name" v-bind:data="search_name" :validation="'text'"
                          @clickedSomething:change="autocomplete_name" @not_exist_data="not_exist_name_customer">
                        </autocomplete>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="d-flex justify-content-center">
                        <b-button v-b-modal.customer-modal @click="openModal">Agregar Cliente</b-button>
                      </div>
                    </div>
                  </div>
                  <div class="row m-2 justify-content-center">
                    <div class="col-3">
                      <div >
                        <select data-size="12" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" placeholder="Especie"
                           tabindex="-98" v-model="valor_select_especie">
                           <!-- <option>---- Selecion una especie----</option> -->
                          <option v-for="especie in select_especies" :key="especie.id" :value="especie.id"
                            v-text="especie.nombre /* + ' - Bs ' + especie.precio */">
                          </option>
                        </select>
                      </div>
                    </div>
                    <!--  <div class="col-auto d-flex align-items-center">
                      <span class="text-secondary font-weight-bold ">Sugerencias </span>:
                      <div class="d-flex justify-content-center">
                        <button class="btn btn-primary btn-sm rounded-circle"
                          :class="suggestion_icon_active ? 'bg-primary' : 'bg-secondary'" type="button"
                          style="padding:6px 6px 6px 6px;" @click="open_modal(1)">
                          <i class="material-icons">info</i>
                        </button>
                      </div>
                    </div> -->
                  </div>
                  <div class="row align-items-center justify-content-md-center">
                    <div class="col-2">
                      <!--<div class="row">
                                                <div class="col">
                                                    <div class="input-group input-group-static mb-4">
                                                        <select id="reason_event" data-size="7"
                                                            data-style="btn btn-primary btn-round" title="Especie"
                                                            class="selectpicker" tabindex="-98" v-model="valor_select_especie">
                                                            <option v-for="especie in select_especies" :key="especie.id"
                                                                :value="especie.id" v-text="especie.nombre /* + ' - Bs ' + especie.precio */">
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>-->
                      <div class="row">
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Codígo</label>
                            <input type="text" class="form-control" @input="set_datos_producto"
                              v-model="codigo_producto">
                            <span class="text-error" v-if="codigo_valido">Codigo no válido</span>
                          </div>
                        </div>
                      </div>
                      <div class="row justify-content-md-center">
                        <div class="col d-flex justify-content-center">
                          <button class="btn btn-primary btn-sm" type="button" @click="add_row('materia_prima')"
                            style="">
                             <i class="material-icons">Añadir</i>
                          </button>
                        </div>
                      </div>
                      <div class="row justify-content-md-center">
                        <div class="col d-flex flex-column align-items-center">
                          <div>
                            <input type="checkbox" id="checkbox1" :checked="checkOtrosProd === 'Liston'"
                              @change="checkSingle('Liston')">
                            <label for="checkbox1">Liston</label>
                          </div>
                          <div>
                            <input type="checkbox" id="checkbox2" :checked="checkOtrosProd === 'Ripa'"
                              @change="checkSingle('Ripa')">
                            <label for="checkbox2">Ripa</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col m-2">
                      <div class="row">
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Espesor [plg.]</label>
                            <input type="text" class="form-control text-center " v-model="espesor_plg"
                              :disabled="isInputDisabled">
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Ancho [plg.]</label>
                            <input type="text" class="form-control text-center" v-model="ancho_plg"
                              :disabled="isInputDisabled">
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Largo [pie]</label>
                            <input type="text" class="form-control text-center" v-model="largo_p"
                              :disabled="isInputDisabled">
                          </div>
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Espesor [cm.]</label>
                            <input type="text" class="form-control text-center" v-model="espesor_c"
                              :disabled="isInputDisabled">
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Ancho [cm.]</label>
                            <input type="text" class="form-control text-center" v-model="ancho_c"
                              :disabled="isInputDisabled">
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled">
                            <label class="bmd-label-floating">Largo [metro]</label>
                            <input type="text" class="form-control text-center" v-model="largo_m"
                              :disabled="isInputDisabled">
                          </div>
                        </div>
                        <!--<div class="col">
                                                    <div class="form-group bmd-form-group is-filled">
                                                        <label class="bmd-label-floating">Cantidad</label>
                                                        <input type="number" class="form-control text-center"
                                                            v-model="cantidad" :min="0">
                                                        <span class="text-error" v-if="errors.cantidad">{{errors.cantidad}}</span>
                                                    </div>
                                                </div>-->


                      </div>
                    </div>
                    <div class="col-2">
                     <div class="row">
                        <div class="d-flex justify-content-center">
                         <!--  <button class="btn btn-primary btn-sm rounded-circle" type="button"
                            style="padding:6px 6px 6px 6px" @click="get_productos()">
                            <i class="material-icons">Buscar</i>
                          </button> -->
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group bmd-form-group is-filled mt-2 mb-0">
                          <label class="bmd-label-floating">Precio[bs]</label>
                          <input type="number" class="form-control text-center" v-model="precio">
                          <span class="text-error" v-if="errors.precio">{{ errors.precio }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">Observación</label>
                        <input type="text" class="form-control text-center" v-model="observacion">
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="form-group bmd-form-group is-filled">
                        <h4 class="m-0 text-center">Stock:</h4>
                        <h3 class="m-0 text-center">{{ stock }}</h3>
                      </div>
                    </div>
                  </div>

                  <div class="row" style="width: 160%">
                    <div class="col-8">
                      <div class="table-responsive">
                        <div class="form-group">
                          <div class="d-flex flex-column">
                            <table id="lista_material2" class="table table-bordered table-striped">
                              <thead>
                                <th class="text-center"><b>OP.</b></th>
                                <th class="text-center"><b>Especie</b></th>
                                <th class="text-center"><b>Observacion</b></th>
                                <th class="text-center"><b>Espesor<br>[plg]</b></th>
                                <th class="text-center"><b>Ancho<br>[plg]</b></th>
                                <th class="text-center"><b>Largo<br>[pie]</b></th>
                                <th class="text-center"><b>Cantidad</b></th>
                                <th class="text-center"><b>Precio<br>[bs]</b></th>
                                <th class="text-center"><b>SubTotal<br>[bs]</b></th>
                              </thead>
                              <tbody>
                                <tr v-for="(el, index) in lista_productos" :key="index">
                                  <td class="p-0" style="width: 30px;">
                                    <div class="row">
                                      <div class="col">
                                        <button class="btn btn-link btn-sm" @click="delete_row(index)"><i
                                            class="material-icons">delete</i>
                                        </button>
                                      </div>
                                      <!--  <div v-if="el.otro_material == ''" class="col">
                                        <button class="btn btn-link btn-sm" @click="open_modal(3, index)"><i
                                            class="material-icons">edit</i>
                                        </button>
                                      </div> -->
                                    </div>
                                  </td>
                                  <td class="p-0">
                                    <p class="font-weight-bold mb-0 text-center">{{ el.especie }}</p>
                                  </td>
                                  <td class="p-0">
                                    <p class="font-weight-bold mb-0 text-center">{{ el.observacion }}</p>
                                  </td>
                                  <td class="p-0" style="width: 15px;">
                                    <div v-if="!el.espesor_ref" class="font-weight-bold mb-0 text-center">
                                      <p class="font-weight-bold mb-0 text-center">{{ el.espesor }}</p>
                                    </div>
                                    <div v-else-if="el.espesor_ref != el.espesor_sug"
                                      class="font-weight-bold mb-0 text-center">
                                      <span
                                        v-bind:class="[Number(el.espesor_sug) > Number(el.espesor_ref) ? 'text-success' : 'text-danger']">{{
        el.espesor_ref
      }}</span>/
                                      <span
                                        v-bind:class="[Number(el.espesor_ref) > Number(el.espesor_sug) ? 'text-success' : 'text-danger']">{{
        el.espesor_sug
      }}</span>
                                    </div>
                                    <div v-else class="font-weight-bold mb-0 text-center">
                                      <span class="text-success">{{ el.espesor_sug }}</span>/
                                      <span class="text-success">{{ el.espesor_ref }}</span>
                                    </div>
                                  </td>
                                  <td class="p-0" style="width: 15px;">
                                    <div v-if="!el.ancho_ref" class="font-weight-bold mb-0 text-center">
                                      <p class="font-weight-bold mb-0 text-center">{{ el.ancho }}</p>
                                    </div>
                                    <div v-else-if="el.ancho_ref != el.ancho_sug"
                                      class="font-weight-bold mb-0 text-center">
                                      <span
                                        v-bind:class="[Number(el.ancho_sug) > Number(el.ancho_ref) ? 'text-success' : 'text-danger']">{{
        el.ancho_ref
      }}</span>/
                                      <span
                                        v-bind:class="[Number(el.ancho_ref) > Number(el.ancho_sug) ? 'text-success' : 'text-danger']">{{
        el.ancho_sug
      }}</span>
                                    </div>
                                    <div v-else class="font-weight-bold mb-0 text-center">
                                      <span class="text-success">{{ el.ancho_sug }}</span>/
                                      <span class="text-success">{{ el.ancho_ref }}</span>
                                    </div>
                                  </td>
                                  <td class="p-0" style="width: 15px;">
                                    <div v-if="!el.largo_ref" class="font-weight-bold mb-0 text-center">
                                      <p class="font-weight-bold mb-0 text-center">
                                        {{ el.otro_material != "" ? (el.largo_mt + "(m)") : el.largo }}</p>
                                    </div>
                                    <div v-else-if="el.largo_ref != el.largo_sug"
                                      class="font-weight-bold mb-0 text-center">
                                      <span
                                        v-bind:class="[Number(el.largo_sug) > Number(el.largo_ref) ? 'text-success' : 'text-danger']">{{
        el.largo_ref
      }}</span>/
                                      <span
                                        v-bind:class="[Number(el.largo_ref) > Number(el.largo_sug) ? 'text-success' : 'text-danger']">{{
        el.largo_sug
      }}</span>
                                    </div>
                                    <div v-else class="font-weight-bold mb-0 text-center">
                                      <span class="text-success">{{ el.largo_sug }}</span>/
                                      <span class="text-success">{{ el.largo_ref }}</span>
                                    </div>
                                  </td>
                                  <!--bg-success border border-white text-white-->
                                  <td class="p-0" style="width: 20%;">
                                    <div class="input-group bmd-form-group is-filled">
                                      <input class="form-control input-group-sm text-center" step="any" min="1"
                                        type="number" v-model="el.cantidad" style="width: 160%"
                                        @input="actualizarResultado(index)" @click="select_contenido_input" />
                                      /{{ el.stock }}
                                    </div>
                                  </td>
                                  <td class="p-0" style="width: 15px;">
                                    <p class="font-weight-bold mb-0 text-center">{{ el.precio }}</p>
                                  </td>
                                  <td class="p-0">
                                    <p class="font-weight-bold mb-0 text-center">{{ el.subtotal }}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="proforma" class="row justify-content-center">
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">Nombre</label>
                        <input type="text" class="form-control text-center" v-model="nombre_proforma">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">1.- Puesto en Obra</label>
                        <input type="text" class="form-control text-center" v-model="puesto_obra">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">2.- Tipo de Cambio</label>
                        <input type="text" class="form-control text-center" v-model="tipo_cambio">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">3. Condiciones de Entrega</label>
                        <input type="text" class="form-control text-center" v-model="condiciones_entrega">
                      </div>
                    </div>
                  </div>
                  <div v-if="proforma" class="row justify-content-center">
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">4.- Tiempo de Entrega</label>
                        <input type="text" class="form-control text-center" v-model="tiempo_entrega">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">5.- Forma de Entrega</label>
                        <input type="text" class="form-control text-center" v-model="forma_entrega">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <label class="bmd-label-floating">6.- Forma de Pago</label>
                        <input type="text" class="form-control text-center" v-model="forma_de_pago">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <button class="btn btn-success btn-sm" type="button" @click="registro_venta('pr', 'mp')">
                          <i class="material-icons">note</i>Registrar Proforma
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="row justify-content-center">
                    <div class="col-md-12">
                      <h6 class="card-category text-center text-gray">Metodos de Pagos</h6>
                      <br>
                      <div class="row justify-content-center">
                        <div class="col ">
                          <div>
                            <label>
                              <input type="checkbox" v-model="check_efectivo"> EFECTIVO
                              <span class="form-check-sign">
                                <span class="check"></span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled" v-if="check_gift_card">
                            <label class="bmd-label-floating">Monto</label>
                            <input type="text" class="form-control" v-model="gift_card_amount">
                          </div>
                        <!--   <div >
                            <label >
                              <input  type="checkbox" v-model="check_gift_card"> GIFT CARD
                              <span class="form-check-sign">
                                <span class="check"></span>
                              </span>
                            </label>
                          </div> -->
                        </div>
                        <div class="col">
                          <div class="form-group bmd-form-group is-filled" v-if="check_tarjeta">
                            <label class="bmd-label-floating">Numero Tarjeta</label>
                            <input type="text" class="form-control" v-model="numero_tarjeta"
                              v-on:keyup="format_numero_tarjeta" data-type="adhaar-number" maxLength="19">
                          </div>
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="form-check-input" type="checkbox" v-model="check_tarjeta"> TARJETA
                              <span class="form-check-sign">
                                <span class="check"></span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="form-check-input" type="checkbox" v-model="check_otros"> OTRO
                              <span class="form-check-sign">
                                <span class="check"></span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-center">
                    <div v-if="!proforma" class="form-group bmd-form-group is-filled">
                      <button class="btn btn-success btn-sm" type="button" @click="registro_venta('pr', 'mp')">
                        <i class="material-icons"></i>Proforma
                      </button>
                    </div>
                    <div class="form-group bmd-form-group is-filled">
                      <button class="btn btn-warning btn-sm" type="button" @click="registro_venta('nv', 'mp')">
                        <i class="material-icons"></i>Orden de Pedido
                      </button>
                    </div>
                    <div class="form-group bmd-form-group is-filled">
                      <button class="btn btn-danger btn-sm" type="button" @click="cambiar_vista('listaVenta')">
                        <i class="material-icons"></i>Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col" style="width: 20%;right: -9%;">
            <div class="card m-0" style="width: 80%;">
              <div class="card-body">

                <div class="row">
                  <div class="col">
                    <div class="form-group bmd-form-group is-filled">
                      <h4 class="text-secondary font-weight-bold text-center">Subtotal Bs.</h4>
                      <h4 class="text-center">{{ (subtotal_total_aux = subtotal_total).toFixed(2) }}
                      </h4>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="form-group bmd-form-group is-filled text-center">
                      <h4 class="text-secondary font-weight-bold">Descuento Bs.</h4>
                      <input type="number" class="form-control text-center" step="any" v-model="descuento"
                        @input="validar_descuento()" @click="select_contenido_input" placeholder="Ingrese una cantidad">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" style="width: 80%;">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col">
                    <div class="form-group bmd-form-group is-filled text-center">
                      <h3 class="text-danger text-center font-weight-bold">Total Bs.</h3>
                      <h4 class="text-center text-light bg-danger">{{ (total_comp).toFixed(2) }}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" style="width: 80%;">
              <div class="card-header card-header-text card-header-warning">
                <div class="card-text">
                  <h4 class="card-title"> Forma de pago</h4>
                </div>
              </div>
              <div class="card-body">
                <div class="row justify-content-center">
                  <div class="col-4 p-0">
                    <p class="text-secondary w-auto m-0">Plazo</p>
                  </div>
                  <div class="col-2">
                    <input type="checkbox" class="" v-model="check_plazo">
                  </div>
                </div>
                <div class="row" v-if="check_plazo">
                  <div class="col">
                    <div class="form-group bmd-form-group is-filled text-center">
                      <h4 class="text-secondary font-weight-bold">A cuenta</h4>
                      <input type="number" class="form-control text-center" step="any" v-model="a_cuenta"
                        @input="validar_a_cuenta()" @click="select_contenido_input" placeholder="Ingrese una cantidad">
                    </div>
                  </div>
                </div>
                <div class="row" v-if="check_plazo">
                  <div class="col">
                    <div class="form-group bmd-form-group is-filled">
                      <h4 class="text-secondary font-weight-bold text-center">Saldo Bs.</h4>
                      <h4 class="text-center">{{ (saldo_comp).toFixed(2) }}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" style="width: 80%;">
              <div class="card-body">
                <div class="card-header card-header-text card-header-warning">
                  <div class="card-text">
                    <h4 class="card-title"> Calculadora</h4>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled text-center">
                        <h4 class="text-secondary font-weight-bold">Pago con Bs.</h4>
                        <input type="number" class="form-control text-center" step="any" v-model="pago_con"
                          @input="validar_pago_con()" @click="select_contenido_input"
                          placeholder="Ingrese una cantidad">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-group bmd-form-group is-filled">
                        <h4 class="text-secondary font-weight-bold text-center">Cambio Bs.</h4>
                        <h4 class="text-center">{{ (cambio_comp).toFixed(2) }}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </template>

    </div>


    <template>
      <div id="app">

        <CustomerModal :showModal.sync="showModal" :modalTitle="modalTitle" :ci="ci" :nit="nit" :name="name"
          :phone1="phone1" :email="email" :address="address" :city_id="city_id" :arrayCity="array_city"
          @reset="resetModal" @store-customer="store_customer()" @customer-stored="handleCustomerStored" />
      </div>
    </template>


  <template v-if="listado==3">
   <TableProforma></TableProforma>
  </template>


  <template v-if="listado==4">
   <TableVenta></TableVenta>
  </template>

  <template v-if="listado==5">
    <TableCobros></TableCobros>
  </template>

  </div>

</template>

<script>
import axios from "axios";
import moment from 'moment'
import autocomplete from '../components/Module-Sale/autocomplete'
import { BTable, BPagination, BDropdown, BDropdownItem } from 'bootstrap-vue';
import { commonMixin } from './common_mixin.js';
import Multiselect from 'vue-multiselect';
import Swal from 'sweetalert2';
import BootstrapVue from 'bootstrap-vue';
import CustomerModal from '../components/Module-Sale/CustomerModal';
import TableProforma from '../components/Module-Sale/Table-proforma.vue';
import TableVenta from '../components/Module-Sale/Table-venta.vue';
import TableCobros from '../components/Module-Sale/Table-cobros.vue';

import Loading from '../components/Loading.vue';
export default {
  mixins: [commonMixin],
  data() {
    return {
      isLoading: false,
      showModal: false,
      modalTitle: 'Registar Cliente',
      toastSuccessMessage: "",// Asegúrate de que `toast` esté definido en `data`
      //datos generales de venta
      cliente_id: 0,
      //datos venta de acerrin y lena
      forma_pago: true,
      detalle: "",
      cantidad_derivado: 0,
      //datos venta materia prima
      proforma: false,
      valor_select_especie: 0,
      codigo_producto: "",
      codigo_valido: false,
      bool_input: true,
      reingreso: 0,
      isInputDisabled: false,
      espesor_plg: 0,
      espesor_c: 0,
      ancho_plg: 0,
      ancho_c: 0,
      largo_p: 0,
      largo_m: 0,
      precio: "",
      cantidad: 0,
      stock: 0,
      observacion: "",
      descuento: "0.00",
      subtotal_total_aux: 0,
      lista_productos: [],
      select_especies: [],
      suggestion: 0,
      search_name: "",
      search_nit: "",
      a_cuenta: "0.00",
      total: 0,
      saldo: 0,
      pago_con: "0.00",
      cambio: 0,
      especie_info: [],
      producto_info: [],
      check_plazo: false,
      //parte de venta de materia prima(checkbox)
      checkOtrosProd: null,


      //datos para registro de cliente
      nit: "",
      invoice_name: "",
      name: "",
      ci: "",
      complement: "",
      phone1: "",
      phone2: "",
      address: "",
      email: "",

      city_id: "",
      city: "",
      synchronized: "",
      identity_document_type_id: "",
      //array para los select del formulario
      array_city: [],
      array_identity_document_type: [],

      //datos para proforma
      nombre_proforma: "",
      puesto_obra: "",
      tipo_cambio: "",
      condiciones_entrega: "",
      tiempo_entrega: "",
      forma_entrega: "",
      forma_de_pago: "",

      //Datos para reingreso de ventas
      lista_reingresos: '',
      lista_romaneo: [{ "especie": "", "espesor": "", "largo": "", "ancho": "", "cantidad": 0, "seleccionado": false }],
      opciones_especies: [],
      description: '',
      fecha_registro: moment(new Date(), "DD/MM/YYYY").format("YYYY-MM-DD"),
      venta_reingreso_id: "",



      suggestion_icon_active: false,
      //tabla de datos venta materia prima
      column_productos: [
        { key: 'codigo', label: 'Codigo' },
        { key: 'espesor', label: 'Espesor' },
        { key: 'ancho', label: 'Ancho' },
        { key: 'largo', label: 'Largo' },
        { key: 'cantidad', label: 'Cantidad Piezas' },
        { key: 'cantidad_pies', label: 'Cantidad Pies' },
        { key: 'codigo_ref', label: 'Acciones' }
      ],

      //datos tabla de productos de modal de venta de materia prima
      currentPage: 1,
      itemsPerPage: 5,
      // paginacion para la tabla
      list_productos: [],
      itemsPerPage: 10,


      modal_title: "",
      listado: 2,
      modal1: 0,
      modal2: 0,
      modal3: 0,

      //Datos del modal de detalles
      molde: [1, 2, 3, 4, 5, 6, 7],
      detalle_descripcion: 0,
      detalle_item: 0,
      detalle_cantidad_molde: 0,
      detalle_molde: 0,
      detalle_check_machimbre: 0,
      detalle_check_zocalo: 0,
      detalle_select_machimbre: "",
      detalle_select_zocalo: "",
      detalle_indice: -1,
      detalle_complemento_array: [
        { "valor": "arriba" },
        { "valor": "abajo" },
        { "valor": "izquierda" },
        { "valor": "derecha" },
        { "valor": "todo" }
      ],
      detalle_precio_machimbre: 0,
      detalle_precio_zocalo: 0,

      //metodos de pago
      payment_method_type_id: "",

      check_efectivo: false,
      check_tarjeta: false,
      check_otros: false,
      check_gift_card: false,
      check_otros: false,

      numero_tarjeta: "",
      gift_card_amount: 0,
      array_payment_method_type: [],


      errors: [],
    };
  },
  updated: function () {
    /*  this.$nextTick(function () {
       $('.selectpicker').selectpicker('refresh');
     }) */

  },
  computed: {
    // paginacion de detalle
    paginate_table() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.list_productos.slice(startIndex, startIndex + this.itemsPerPage);
    },
    //Calcula los elementos de la paginación de venta de materia prima
    pagesNumber() {
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
    },
    subtotal_total() {//calcula el total de los subtotales de cada producto registrado en la tabla
      let subtotal = 0;
      if (Object.keys(this.lista_productos).length == 0) {
        //si la lista de productos no tiene ninguna fila devuelve 0
        return subtotal;
      }
      switch (this.listado) {
        case 2:
          this.lista_productos.map(fila => {
            //suma todos los datos de la columna de subtotal de toda la tabla
            subtotal = subtotal + parseFloat(fila.subtotal);
          });
          //retorna el total de la suma de subtotales de la tabla
          break;
        case 3:
          this.lista_productos.map(fila => {
            //suma todos los datos de la columna de subtotal de toda la tabla
            subtotal = subtotal + parseFloat(fila.subtotal);
          });
          //retorna el total de la suma de subtotales de la tabla
          break;
        default:
          break;
      }
      return subtotal;
    },
    saldo_comp() {//calcula el saldo de la forma de pago a plazo (total general menos monto a cuenta)
      if (this.a_cuenta == "0.00") {
        //si a cuenta es cero se deja saldo en 0
        return 0;
      }
      this.saldo = this.total - this.a_cuenta;
      return this.saldo;
    },
    cambio_comp() {//calcula el cambio que se debe dar al cliente (pago recibido menos el total general)
      if (this.pago_con == "0.00") {
        //si el pago es cero el cambio se mantiene en cero
        return 0;
      }
      this.cambio = this.pago_con - this.total;
      return this.cambio;
    },
    total_comp() {//calcula el total general de la tabla (total de los subtotales menos el descuento)
      this.total = this.subtotal_total_aux - this.descuento;
      return this.total;
    },

  },
  components: {
    // VueTable,
    autocomplete,Loading, BTable, BPagination, BDropdown, BDropdownItem, Multiselect, BootstrapVue, CustomerModal,TableProforma,TableVenta,TableCobros
  },
  watch: {
    espesor_plg(val) {
      this.convertirUnidades(val, 'espesor_c', 2.54, true);
    },
    ancho_plg(val) {
      this.convertirUnidades(val, 'ancho_c', 2.54, true);
    },
    largo_p(val) {
      this.convertirUnidades(val, 'largo_m', 3.28, false);
    },
    espesor_c(val) {
      this.convertirUnidades(val, 'espesor_plg', 2.54, false);
    },
    ancho_c(val) {
      this.convertirUnidades(val, 'ancho_plg', 2.54, false);
    },
    largo_m(val) {
      console.log("??");
      this.convertirUnidades(val, 'largo_p', 0.3048, false);
    },
    valor_select_especie(val) {
      this.fetch_especies(val);
    },
    toastSuccess() {
      if (this.toastSuccess) {
        console.log("devuelta toast ", this.toastSuccess)
        this.$toast.success("Se registro exitosamente!");
      }
    },
  },
  methods: {
    typeLista(number){
      this.listado=number;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleCustomerStored(customerData) {


      this.$toast.success(customerData);

    },
    async fetch_especies(id) {
      if (id == 0) {
        return;
      }
      // await axios.post("barraca/especie/get_especie_by_id/" + id,)
      await axios.post("https://msinventario-zgaud6cq5q-uc.a.run.app/api/especies/" + id)
        .then(response => {
          if (response.status === 200) {
            this.especie_info = response.data;
          }
        })
        .catch(error => {
          console.log("error en consulta: ", error);
        });
    },
    format_numero_tarjeta() {
      let me = this;
      if (me.numero_tarjeta.length == 4) {
        me.numero_tarjeta = me.numero_tarjeta + '00000000';
      }
      me.numero_tarjeta = me.numero_tarjeta.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
    },
    guardar_detalle_descripcion() {
      let descripcion_nueva = "";
      let precio_suma_detalles = 0;
      if (this.detalle_molde != 0) {
        descripcion_nueva = descripcion_nueva + " : " + this.detalle_cantidad_molde + " con molde " + this.detalle_molde
      }
      if (this.detalle_check_machimbre) {
        descripcion_nueva = descripcion_nueva + " : Machimbre " + this.lista_a_texto(this.detalle_select_machimbre) + "-$" + this.detalle_precio_machimbre;
        precio_suma_detalles = precio_suma_detalles + parseFloat(this.detalle_precio_machimbre);
      }
      if (this.detalle_check_zocalo) {
        descripcion_nueva = descripcion_nueva + " : Zocalo " + this.lista_a_texto(this.detalle_select_zocalo) + "-$" + this.detalle_precio_zocalo;
        precio_suma_detalles = precio_suma_detalles + parseFloat(this.detalle_precio_zocalo);
      }
      console.log("precio de la suma de los detalles que se suma a subto." + precio_suma_detalles);
      this.lista_productos[this.detalle_indice].observacion = this.lista_productos[this.detalle_indice].observacion_aux + descripcion_nueva;
      if (this.lista_productos[this.detalle_indice].precio_detalles > 0) {
        let subtotal = this.lista_productos[this.detalle_indice].subtotal;
        this.lista_productos[this.detalle_indice].subtotal = subtotal - this.lista_productos[this.detalle_indice].precio_detalles;
      }
      this.lista_productos[this.detalle_indice].precio_detalles = parseFloat(precio_suma_detalles);
      this.detalle_descripcion = 0;
      this.detalle_item = 0;
      this.detalle_cantidad_molde = 0;
      this.detalle_molde = 0;
      this.detalle_check_machimbre = null;
      this.detalle_check_zocalo = null;
      this.detalle_select_machimbre = "";
      this.detalle_select_zocalo = "";
      this.detalle_indice = -1;
      this.detalle_precio_machimbre = 0;
      this.detalle_precio_zocalo = 0;
      this.close_modal(3);

    },
    lista_a_texto(lista) {
      let texto = "";
      lista.forEach(el => {
        texto = texto + el.valor + " ";
      });
      return texto;
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    checkSingle(checkboxId) {
      if (this.checkOtrosProd === checkboxId) {
        // Si el usuario hace clic en el checkbox que ya está seleccionado, deseleccionarlo
        this.checkOtrosProd = null;
      } else {
        // Seleccionar el nuevo checkbox
        this.checkOtrosProd = checkboxId;
      }
    },
    autocomplete_nit: function (param) {
      console.log("PARAMAS ", param);
      let me = this;
      me.search_name = param.name;
      me.cliente_id = param._id;
      //me.search_nit = param.nit;
    },
    autocomplete_name: function (param) {
      let me = this;
      //me.search_name = param.name;
      me.cliente_id = param._id;
      me.search_nit = param.nit;
    },
    not_exist_nit_customer: function (search) {
      // this.nit_customer = search;
      let me = this;
      me.search_nit = search;
    },
    not_exist_name_customer: function (search) {
      // this.name_customer = search;
      let me = this;
      me.search_name = search;
    },
    get_cities() {
      let me = this;
      axios.get("http://3.139.103.136/api/city")
        .then(function (response) {
          console.log("CIUDADES ", response.data.data)
          me.array_city = response.data.data;
        })
        .catch(function (error) {
        });
    },
    get_identity_document_type() {
      let me = this;
      axios.get(this.get_url("/identity_document_type/get_list_enabled"))
        .then(function (response) {
          let respuesta = response.data;
          console.log(respuesta);
          me.array_identity_document_type = respuesta;
          // if (me.array_identity_document_type.length > 0) {
          //     me.identity_document_type_id = me.array_identity_document_type[0].id;
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    store_customer() {
      let me = this;
      // me.$refs.loading.start("Registrando Cliente");
      axios
        .post("http://3.139.103.136/api/customer", {
          nit: this.nit,

          name: this.name,
          ci: this.ci,
          complement: this.complement,
          phone: this.phone1,

          email: this.email,
          address: this.address,
          city_id: this.city_id,
          identity_document_type_id: this.identity_document_type_id,

        })
        .then(function (response) {
          /*  Swal({
             title: 'Exito',
             text: "Registro de nuevo cliente valido",
             type: 'success',
             confirmButtonClass: "btn btn-success",
             buttonsStyling: false
           }); */
          // me.$refs.loading.stop();
          // me.close_modal(2);
        })
        .catch(function (error) {
          // me.$refs.loading.stop();
          console.log("error validation", error);
          /*  Swal({
             title: 'Error al registrar el Cliente!',
             text: error.response.data.message,
             type: 'error',
             confirmButtonClass: "btn btn-success",
             buttonsStyling: false
           }).then(function () {
             // me.close_form();
           });
           var er = error.response.data.errors;
           me.errors = er; */

        });
    },
    add_suggest_row(datos) {
      //envia post al backend y trae los datos de los datos correspondiente al codigo de producto
      // axios.post("/barraca/producto/get_producto_codigo", {
      axios.post("https://msinventario-zgaud6cq5q-uc.a.run.app/api/producto/codigo", {

        codigo_producto: datos
      })
        .then(response => {
          let producto = response.data.producto;
          let especie = response.data.especie;
           console.log("GET PRODUC FOR CODE ",response)
          if (this.precio != "") {
            /*this.lista_productos.map(fila => {
               if (fila.codigo_producto==this.codigo_producto) {
                   flag=true;
               }
           });
           if (flag) {
               Swal({
                   title: 'Error',
                   text: "El item ya existen en la lista.",
                   type: 'error',
                   confirmButtonClass: "btn btn-success",
                   buttonsStyling: false
               });
               return;
           }*/
            //si el precio y la cantidad no tiene datos no adiciona fila
            let new_row = {
              "codigo_producto": producto.codigo,
              "id": producto.id,
              "especie": especie.nombre,
              "especie_id": especie.id,
              "observacion": this.observacion,
              "observacion_aux": this.observacion,
              "espesor_sug": producto.espesor,
              "ancho_sug": producto.ancho,
              "largo_sug": producto.largo,
              "espesor_ref": this.espesor_plg,
              "ancho_ref": this.ancho_plg,
              "largo_ref": this.largo_p,
              "espesor": parseFloat(producto.espesor) >= parseFloat(this.espesor_plg) ? this.espesor_plg : producto.espesor,
              "ancho": parseFloat(producto.ancho) >= parseFloat(this.ancho_plg) ? this.ancho_plg : producto.ancho,
              "largo": parseFloat(producto.largo) >= parseFloat(this.largo_p) ? this.largo_p : producto.largo,
              "largo_mt": this.largo_m,
              "cantidad": 0,
              "stock": producto.cantidad,
              "precio": this.precio,
              "suggestion": 1,
              "otro_material": "",
              "precio_detalles": 0
            };
            this.reingreso = 1;
            let espesor_op = producto.espesor;
            let ancho_op = producto.ancho;
            let largo_op = producto.largo;

            if (producto.espesor > this.espesor) {
              espesor_op = this.espesor;
            }
            if (producto.ancho > this.ancho) {
              ancho_op = this.ancho;
            }
            if (producto.largo > this.largo_p) {
              largo_op = this.largo_p;
            }
            new_row["subtotal"] = Math.round((espesor_op * ancho_op * largo_op / 12) * (this.cantidad * this.precio) * 100) / 100;
            this.lista_productos.push(new_row);
            let me = this;
            this.subtotal_total_aux = this.subtotal_total_aux + Math.round((espesor_op * ancho_op * largo_op / 12) * (this.cantidad * this.precio) * 100) / 100;
            this.espesor_plg = 0;

            console.log("largo: " + (parseFloat(producto.largo) >= parseFloat(this.largo_p)));
            console.log("espesor: " + (parseFloat(producto.espesor) >= parseFloat(this.espesor_plg)));
            console.log("ancho: " + (parseFloat(producto.ancho) >= parseFloat(this.ancho_plg)));
            console.log(new_row);
            setTimeout(function () {
              me.ancho_plg = 0;
            }, 150);
            setTimeout(function () {
              me.largo_p = 0;
            }, 300);
            this.isInputDisabled = false;
            this.codigo_valido = false;
            this.producto_info = [];
            this.especie_info = [];
            this.observacion = "";
            this.cantidad = "";
            this.precio = "";
            this.stock = 0;
            this.codigo_producto = "";
            this.valor_select_especie = 0

          } else {
            /*  Swal({
               title: 'Error',
               text: "Rellene el campo de precio",
               type: 'error',
               confirmButtonClass: "btn btn-success",
               buttonsStyling: false
             }); */
            this.$toast.error("Rellene el campo de precio")
          }
        })
        .catch(error => {
          console.log("error en consulta: ", error);
        });


    },
    convertirUnidades(valor, propiedadDestino, factor, multiplicar) {
      try {
        //console.log(valor);
        if (this.bool_input) {
          //console.log("entra if mod valor : " + valor)
          let valor_set = (multiplicar ? valor * factor : valor / factor).toFixed(2);
          //console.log("valor de la operacion : " + valor_set);
          this.bool_input = false;
          this[propiedadDestino] = valor_set;
        } else {
          //console.log("entra if mod boool " + valor);
          this.bool_input = true;
        }
        //console.log("!!");
      } catch (error) {
        console.log(error);
      }

    },
    onPageChange(newPage) {
      this.currentPage = newPage;
    },
    get_productos() {//rellena lista de productos de la tabla en el modal
      let me = this;
      if (me.valor_select_especie == 0) {
        /*  Swal({
           title: 'Especie',
           text: "Seleccione una especie.",
           type: 'warning',
           confirmButtonClass: "btn btn-success",
           buttonsStyling: false
         }); */
        this.$toast.warning("Seleccione una especie.")
        return;
      }
      // axios.post("/barraca/producto/get_productos", {
      axios.post("/barraca/producto/get_productos", {
        largo: me.largo_p,
        ancho: me.ancho_plg,
        espesor: me.espesor_plg,
        especie_id: me.valor_select_especie
      })
        .then(response => {
          if (response.data.suggestion == '0') {
            this.set_atributos_producto(response.data.producto, response.data.especie)
            me.codigo_producto = response.data.producto.codigo;
          } else {
            me.suggestion_icon_active = true;
            me.list_productos = response.data.datos;
            this.especie_info = response.data.especie;
          }
        })
        .catch(error => {
          console.log("error en consulta: ", error);
        });
    },
    send_form_data() {

    },
    cambiar_vista(opcion) {//cambia la visualizacion de los componentes e incializacion de las variables
      switch (opcion) {
        case "listaVenta"://componente del menu principal
          this.detalle = "";
          this.stock = 0;

          this.proforma = false;
          this.nombre_proforma = "";
          this.puesto_obra = "";
          this.tipo_cambio = "";
          this.condiciones_entrega = "";
          this.tiempo_entrega = "";
          this.forma_entrega = "";
          this.forma_de_pago = "";

          this.tipo_pago = 0;
          this.check_gift_card = false;
          this.check_efectivo = false;
          this.check_tarjeta = false;
          this.check_otros = false;
          this.numero_tarjeta = "";
          this.gift_card_amount = 0;

          this.search_text = "";
          this.codigo_producto = "";
          this.codigo_valido = false;
          this.espesor_plg = 0;
          this.ancho_plg = 0;
          this.largo_p = 0;
          this.precio = "";
          this.cantidad = "";
          this.observacion = "";
          this.descuento = "0.00";
          this.subtotal_total_aux = 0;
          this.lista_productos = [];
          this.opciones_autocomplete = [];
          this.select_especies = [];
          this.search_name = "";
          this.a_cuenta = "0.00";
          this.total = 0;
          this.saldo = 0;
          this.pago_con = "0.00";
          this.cambio = 0;
          this.especie_info = [];
          this.producto_info = [];
          this.check_plazo = false;
          this.input_disabled = false;
          this.typeLista(4)
          break;
        case "listaProforma"://vista de materia prima
        this.detalle = "";
          this.stock = 0;

          this.proforma = false;
          this.nombre_proforma = "";
          this.puesto_obra = "";
          this.tipo_cambio = "";
          this.condiciones_entrega = "";
          this.tiempo_entrega = "";
          this.forma_entrega = "";
          this.forma_de_pago = "";

          this.tipo_pago = 0;
          this.check_gift_card = false;
          this.check_efectivo = false;
          this.check_tarjeta = false;
          this.check_otros = false;
          this.numero_tarjeta = "";
          this.gift_card_amount = 0;

          this.search_text = "";
          this.codigo_producto = "";
          this.codigo_valido = false;
          this.espesor_plg = 0;
          this.ancho_plg = 0;
          this.largo_p = 0;
          this.precio = "";
          this.cantidad = "";
          this.observacion = "";
          this.descuento = "0.00";
          this.subtotal_total_aux = 0;
          this.lista_productos = [];
          this.opciones_autocomplete = [];
          this.select_especies = [];
          this.search_name = "";
          this.a_cuenta = "0.00";
          this.total = 0;
          this.saldo = 0;
          this.pago_con = "0.00";
          this.cambio = 0;
          this.especie_info = [];
          this.producto_info = [];
          this.check_plazo = false;
          this.input_disabled = false;

        this.typeLista(3)

          break;
        case "acerrin_lena"://vista de venta de acerrin y leña
          this.forma_pago = false;
          this.listado = 3;
          break;
        default:
          break;
      }
    },
    close_modal(number) {
      console.log("close modal");
      this['modal' + number] = 0;

      if (number == 2) {
        this.form_title = "";
        this.nit = "";
        this.name = "";
        this.invoice_name = "";
        this.ci = "";
        this.phone1 = "";
        this.phone2 = "";
        this.address = "";
        this.email = "";
        this.address = "";
        this.city = "";
        this.city_id = "";
        this.identity_document_type_id = "";
        this.synchronized = "";
        this.errors = [];
      }

    },
    open_modal(number, index = -1) {
      console.log("OPEN MODAL ", number, index, this['modal' + number])
      if (number == 1) {
        if (this.suggestion_icon_active) {
          this.suggestion_icon_active = false;
        }
        this.modal_title = "SUGERENCIAS";
        this['modal' + number] = 1;
      } else if (number == 2) {
        this.modal_title = "REGISTRAR CLIENTE";
        this['modal' + number] = 1;
      } else if (number == 3) {
        this.modal_title = "AÑADIR DETALLES";
        this['modal' + number] = 3;
        this.detalle_descripcion = this.lista_productos[index].observacion;
        this.detalle_indice = index;
        console.log(this.lista_productos[index]);
      }


    },
    delete_row(index) {//borra fila de la tabla de venta de materia prima
      //fitra la lista de productos de acuerdo al index que se selecciona
      this.lista_productos = this.lista_productos.filter((elemento, i) => i != index);
      if (this.descuento > this.subtotal_total) {//descuento cero si el total de los subtotales es menor al decuento
        this.descuento = 0;
      }
    },
    add_row(accion) {
      console.log('entra en switch');
      switch (accion) {
        case "materia_prima":
          this.input_disabled = false;
          //add fila de la tabla con los datos de un producto
          if (this.precio != "") {
            let check_otro_material = "";
            if (this.checkOtrosProd == "Ripa") {
              check_otro_material = "R";
            } else if (this.checkOtrosProd == 'Liston') {
              check_otro_material = "L";
            }
            if (this.valor_select_especie == 0 && this.codigo_producto == "") {
              /*  Swal({
                 title: 'Seleccionar especie.',
                 text: "",
                 type: 'warning',
                 confirmButtonClass: "btn btn-success",
                 buttonsStyling: false
               }); */
              this.$toast.warning("Seleccionar especie.")
              return;
            }
            let codigo_enlista = false;
            this.lista_productos.map(fila => {
              if (fila.codigo_producto == this.codigo_producto && fila.suggestion == 0 && fila.codigo_producto != "") {
                /*  Swal({
                   title: 'Error',
                   text: "El item ya existen en la lista.",
                   type: 'error',
                   confirmButtonClass: "btn btn-success",
                   buttonsStyling: false
                 }); */
                this.$toast.error("El item ya existen en la lista.")
                codigo_enlista = true;
                console.log("entra al codigo rep")

              }
            });
            console.log(codigo_enlista);
            if (codigo_enlista) {
              return;
            }
            //si el precio y la cantidad no tiene datos no adiciona fila
            let new_row = {
              "codigo_producto": this.codigo_producto,
              "id": this.producto_info.id,
              "especie": this.especie_info.nombre,
              "especie_id": this.especie_info.id,
              "observacion": this.observacion,
              "observacion_aux": this.observacion,
              "espesor": this.espesor_plg,
              "ancho": this.ancho_plg,
              "largo": this.largo_p,
              "largo_mt": this.largo_m,
              "stock": this.stock,
              "precio": this.precio,
              "suggestion": 0,
              "cantidad": 0,
              "subtotal": Math.round((this.espesor_plg * this.ancho_plg * this.largo_p / 12) * (this.cantidad * this.precio) * 100) / 100,
              "otro_material": check_otro_material,
              "precio_detalles": 0
            };
            console.log("point 1");
            if (check_otro_material != "") {
              new_row["subtotal"] = Math.round(this.largo_m * this.precio) * this.cantidad;
              new_row["observacion"] = new_row["observacion_aux"] + " : " + this.checkOtrosProd;
              new_row["stock"] = 100;
              if (check_otro_material == "R") {
                new_row["espesor"] = 2;
                new_row["ancho"] = 1;
              } else if (check_otro_material == "L") {
                new_row["espesor"] = 2;
                new_row["ancho"] = 2;
              }
            }
            this.lista_productos.push(new_row);
            console.log("point 2");

            console.log(this.lista_productos);
            let me = this;
            this.subtotal_total_aux = this.subtotal_total_aux + new_row["subtotal"];
            this.espesor_plg = 0;
            setTimeout(function () {
              me.ancho_plg = 0;
            }, 150);
            setTimeout(function () {
              me.largo_p = 0;
            }, 300);
            this.isInputDisabled = false;
            this.codigo_valido = false;
            this.producto_info = [];
            this.especie_info = [];
            this.observacion = "";
            this.cantidad = "";
            this.precio = "";
            this.stock = 0;
            this.codigo_producto = "";
            this.valor_select_especie = 0
          } else {
            /*  Swal({
               title: 'Error',
               text: "Rellene el campo de precio",
               type: 'error',
               confirmButtonClass: "btn btn-success",
               buttonsStyling: false
             }); */
            this.$toast.error("Rellene el campo de precio")
          }
          break;
        case "acerrin_lena":
          if (this.cantidad_derivado == 0 || this.cantidad_derivado == "0") {
            /*  Swal({
               title: 'La cantidad del item a añadir debe ser mayor a cero.',
               text: "",
               type: 'warning',
               confirmButtonClass: "btn btn-success",
               buttonsStyling: false
             }); */
            this.$toast.warning("La cantidad del item a añadir debe ser mayor a cero.")
            return;
          }
          //add fila de la tabla con los datos de acerrin o lena
          if (this.detalle != "" && this.precio != "") {
            //si el precio y la cantidad no tiene datos no adiciona fila
            this.lista_productos.push({
              "detalle": this.detalle,
              "precio": this.precio,
              "cantidad_derivado": this.cantidad_derivado,
              "subtotal": Math.round((this.precio * this.cantidad_derivado) * 100) / 100,
            });
            this.cantidad_derivado = 0;
            this.precio = "";
            this.detalle = "";
          } else {
            /*  Swal({
               title: 'Error',
               text: "Rellene el campo de precio y detalle.",
               type: 'error',
               confirmButtonClass: "btn btn-success",
               buttonsStyling: false
             }); */
            this.$toast.error("Rellene el campo de precio y detalle.")
          }
          break;

        default:
          break;
      }

    },
    select_contenido_input(event) {//cada vez que se pone el mouse sobre un input se selecciona todo el contenido del input
      setTimeout(() => {
        event.target.select();
      });
    },
    validar_descuento() {
      if (this.descuento == "" || this.descuento <= 0) {
        this.descuento = "0.00";
      }
      if (this.descuento > this.subtotal_total) {
        this.descuento = "0.00";
      }
    },
    validar_a_cuenta() {
      if (this.a_cuenta == "" || this.a_cuenta <= 0) {
        this.a_cuenta = "0.00";
      }
      if (this.a_cuenta > this.total) {
        this.a_cuenta = "0.00";
      }
    },
    validar_pago_con() {
      if (this.pago_con == "" || this.pago_con <= 0) {
        this.pago_con = "0.00";
      }
    },
    actualizarResultado(index) {//cada vez que se modifica el valor de los inputs de la tabla se actualiza el total de los subtotales
      let fila = this.lista_productos[index];
      console.log(fila);
      if (fila.cantidad > fila.stock) {
        fila.cantidad = Math.floor(fila.cantidad / 10);
        this.$toast.fire({
          icon: "error",
          title: "No puedes exceder el STOCK.",
        });
      }
      if (fila.cantidad > 0) {
        if (fila.otro_material == "") {
          fila.subtotal = (Math.round((parseFloat(fila.espesor) * parseFloat(fila.ancho) * parseFloat(fila.largo) / 12) * (parseFloat(fila.cantidad) * parseFloat(fila.precio)) * 100) / 100) + parseFloat(fila.precio_detalles);
        } else {
          fila.subtotal = Math.round(parseFloat(fila.largo_mt) * (parseFloat(fila.cantidad) * parseFloat(fila.precio)) * 100) / 100;
        }
      }
      if (fila.cantidad == "" || fila.cantidad <= 0) {
        fila.subtotal = "0.00";
        fila.cantidad = 0;
      }
      if (this.descuento > this.subtotal_total) {
        this.descuento = "0.00";
      }
    },
    /* llenar_opciones() {//llenar opciones de sugerencia del input de NIT con datos de la base de datos
         this.search_name = "";
         this.cliente_id = 0;
         if (this.search_text.length == 0) {
             //si el input de nit esta vacio habilita el input de nombre
             this.input_disabled = false;
             this.opciones_autocomplete = [];
         }
         if (this.search_text.length > 0) {
             //si el input de nit por lo menos tiene un digito pide datos del backend
             axios.post( "/customer/clientes_nit", {
                 nit: this.search_text
             })
                 .then(response => {
                     if (response.status === 200) {
                         this.opciones_autocomplete = response.data;
                     }
                 })
                 .catch(error => {
                     console.log("error en consulta: ", error);
                 });
         }
     },*/
    llenar_campo(nit) {//al seleccionar una opcion de las sugerencias del input de nit se rellena automaticamente el input de nombre
      console.log("llenar campo 1" + nit);
      let copy_opciones = this.opciones_autocomplete;
      let data = copy_opciones.find(el => (el.nit == this.search_nit || el.name == this.search_name));
      console.log("llenar campo 2" + nit);
      console.log(copy_opciones);
      let me = this;
      if (data != undefined) {
        this.put_inputs = true;
        if (nit) {
          console.log("entra nit");
          me.input_name_disabled = true;
          //console.log(data)
          me.search_name = data.name;
        } else {
          console.log("entra name");
          me.input_nit_disabled = true;
          console.log(data.name)
          me.search_nit = data.nit;
        }
        me.cliente_id = data.id;
        setTimeout(function () {
          console.log("!!");
          me.put_inputs = false;
        }, 300);
      }
    },
    set_atributos_producto(producto, especie) {
      let me = this;
      console.log(" set atributos producto ", producto , especie)
      this.espesor_plg = producto.espesor;
      setTimeout(function () {
        //onsole.log("Han pasado x segundos!" + response.data.producto.ancho);
        me.ancho_plg = producto.ancho;
      }, 100);
      setTimeout(function () {
        //console.log("Han pasado x segundos!" + response.data.producto.largo);
        me.largo_p = producto.largo;
      }, 300);
      this.isInputDisabled = true;
      this.stock = producto.cantidad;
      this.codigo_valido = false;
      this.producto_info = producto;
      this.especie_info = especie;
    },
    set_datos_producto() {//da valores de espesor, ancho y largo con los datos que trae del post
      const regex = /^0\d*$/; // Expresión regular para 0 seguido de dígitos del input de codigo
      this.espesor_plg = 0;
      let me = this;
      setTimeout(function () {
        //console.log("Han pasado x segundos!" + response.data.producto.ancho);
        me.ancho_plg = 0;
      }, 150);
      setTimeout(function () {
        //console.log("Han pasado x segundos!" + response.data.producto.largo);
        me.largo_p = 0;
      }, 300);
      this.stock = 0;
      if (this.codigo_producto == "") {
        this.isInputDisabled = false;
        // si el codigo de producto esta vacio sale del metodo y no hace nada
        this.codigo_valido = false;
        return;
      }
      if (!regex.test(this.codigo_producto)) {
        //si el codigo no cumple con la expresion relgular muestra mensaje de error
        this.codigo_valido = true;
        return;
      }
      //envia post al backend y trae los datos de los datos correspondiente al codigo de producto
      // axios.post("/barraca/producto/get_producto_codigo", {
      axios.post("https://msinventario-zgaud6cq5q-uc.a.run.app/api/producto/codigo", {
        codigo_producto: this.codigo_producto
      })
        .then(response => {
          if (response.status === 200 && response.data != "") {
          console.log("ENtra get codigo ",response)

            this.set_atributos_producto(response.data.producto, response.data.especie);
          } else {
            this.codigo_valido = true;
          }
        })
        .catch(error => {
          // this.$toast.error(error.response.data.error)
          console.log("error en consulta: ", error.response);
        });
    },
    registro_venta(tipo, trans) {
      console.log("tipo ", tipo, trans);
      if (!this.check_efectivo && !this.check_gift_card && !this.check_tarjeta && !this.check_otros && tipo != "pr") {
        /*  Swal({
           title: 'Seleccionar un metodo de pago.',
           type: 'warning',
           confirmButtonClass: "btn btn-success",
           buttonsStyling: false
         }); */
        this.$toast.warning("Seleccionar un metodo de pago.")
        return;
      }
      if (this.lista_productos.length == 0) {
        /*  Swal({
           title: 'Error',
           text: "Añada por lo menos un item a la lista.",
           type: 'error',
           confirmButtonClass: "btn btn-success",
           buttonsStyling: false
         }); */
        this.$toast.error("Añada por lo menos un item a la lista.")
        return;
      }
      let break_method = false;
      this.lista_productos.map(fila => {
        if (fila.cantidad == 0) {
          /* Swal({
            title: 'Error',
            text: "Todos los items deben tener un cantidad minima de 1",
            type: 'error',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          }); */
          this.$toast.error("Todos los items deben tener un cantidad minima de 1")
          break_method = true;
        }
        if (fila.suggestion == 1) {
          this.suggestion = 1
        }
      });
      if (break_method) {
        return;
      }
      this.isLoading = true;
      // me.$refs.loading.start("Registrando venta");
      //envia datos de los productos
      axios.post("https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/registrar_venta/", {
        cliente: this.cliente_id,
        subtotal: this.subtotal_total_aux,
        descuento: this.descuento,
        total: this.total,
        tipo_pago: !!this.check_plazo,
        a_cuenta: this.a_cuenta,
        saldo: this.roundFormat(this.saldo,2),
        tipo,
        detalle_productos: this.lista_productos,
        nombre_dirigido: this.nombre_proforma,
        puesto_obra: this.puesto_obra,
        tipo_cambio: this.tipo_cambio,
        condiciones_entrega: this.condiciones_entrega,
        tiempo_entrega: this.tiempo_entrega,
        forma_entrega: this.forma_entrega,
        forma_pago: this.forma_de_pago,
        suggestion: this.suggestion,
        metodo_pago: this.check_efectivo ? 1 : (this.check_gift_card ? 2 : (this.check_tarjeta ? 3 : (this.check_otros ? 4 : 0))),
        monto_gift_card: this.gift_card_amount,
        numero_tarjeta: this.numero_tarjeta,
        trans
      }
      ).then(response => {
        // me.$refs.loading.stop();

        console.log("response: venta" + response)
         if (response.status==200) {
             console.log(response);
             if (trans=="mp") {
                 if (tipo=="nv") {
                     console.log("nota_venta");
                     window.open('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_nota_venta/'+response.data.venta.id,'Nota Venta','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600, top=50 , left=200');
                     this.cambiar_vista('listaVenta');
                     this.isLoading = false;
                 }else if(tipo=="pr"){
                     window.open('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_proforma/'+response.data.venta.id,'Nota Venta','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600, top=50 , left=200');
                     console.log("proforma");
                     this.cambiar_vista('listaProforma');
                     this.isLoading = false;
                 }
             }else{
                 console.log("otro");
                 window.open('https://msventasw2-c2bbf7b5a119.herokuapp.com/venta/print_otros/'+response.data.id,'Nota Venta','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width= 800, height= 600, top=50 , left=200');
                //  this.cambiar_vista('menu');
             }

         }
      })
        .catch(error => {
          console.log("error en consulta: ", error);
        });
    },
    /*   ver_reingresos(row) {
        let me = this;
        this.venta_reingreso_id = row["dtRowId"];
        this.listado = 4;
        this.description = "Ingreso de romaneo por consepto de reingreso de materia en venta.";
        // me.$refs.loading.start("Consultando datos.");
        //envia datos de los productos
        axios.post("/barraca/reingreso/detalle_venta_reingreso", {
          venta_id: this.venta_reingreso_id
        }
        ).then(response => {
          // me.$refs.loading.stop();
          if (response.status == 200) {
            this.lista_reingresos = response.data;
          }
        })
          .catch(error => {
            console.log("error en consulta: ", error);
          });
      }, */
    validar_cantidad(index) {
      let fila = this.lista_romaneo[index];
      if (fila.cantidad == "" || fila.cantidad < 0) {
        fila.cantidad = 0;
      }
    },
    add_row_romaneo() {
      this.lista_romaneo.push({ "especie": "", "espesor": "", "largo": "", "ancho": "", "cantidad": 0, "seleccionado": false });
    },
    delete_row_romaneo() {
      this.lista_romaneo = this.lista_romaneo.filter(elemento => !elemento.seleccionado);
    }
    , getValores() {
      const espesor = this.lista_romaneo.map(ele => ele.espesor);
      const largo = this.lista_romaneo.map(ele => ele.largo);
      const ancho = this.lista_romaneo.map(ele => ele.ancho);
      const especie = this.lista_romaneo.map(ele => ele.especie);

      console.log(largo);
      console.log(espesor);
      console.log(ancho);
      console.log(especie);
    },
    /*  store_romaneo() {
       const espesor = this.lista_romaneo.map(ele => ele.espesor);
       const largo = this.lista_romaneo.map(ele => ele.largo);
       const ancho = this.lista_romaneo.map(ele => ele.ancho);
       const especie = this.lista_romaneo.map(ele => ele.especie);
       const cantidad = this.lista_romaneo.map(ele => ele.cantidad);
       let me = this;

       if (Object.entries(this.lista_romaneo).length === 0) {
          Swal({
           title: 'Error',
           text: "Debe haber por lo menos una fila con datos en la tabla.",
           type: 'error',
           confirmButtonClass: "btn btn-success",
           buttonsStyling: false
         });
         this.$toast.error("Debe haber por lo menos una fila con datos en la tabla.")
         return;
       }
       for (let i = 0; i < espesor.length; i++) {
         if (especie[i] == '' || espesor[i] == '' || largo[i] == '' || ancho[i] == '' || cantidad[i] == 0) {
          /*  Swal({
             title: 'Error',
             text: "Datos de la tabla sin rellenar.",
             type: 'error',
             confirmButtonClass: "btn btn-success",
             buttonsStyling: false
           });
           this.$toast.error("Datos de la tabla sin rellenar.")
           return;
         }
       }
       // me.$refs.loading.start("Registrando Romaneo");
       axios
         .post("barraca/romaneo/store", {
           especie_id: especie,
           espesor,
           largo,
           ancho,
           cantidad,
           descripcion: this.description,
           fecha_registro: this.fecha_registro,
           total_pie_cuadrado: 0.0,
           cantidad_unidad: 0
         })
         .then(function (response) {
           console.log(response);
           // me.$refs.loading.stop();

          /*  Swal({
             title: 'Romaneo Registrado!',
             text: "El romaneo fue registrado con exito.",
             type: 'success',
             confirmButtonClass: "btn btn-success",
             buttonsStyling: false
           });
           this.$toast.success("El romaneo fue registrado con exito.")
           axios.get(me.path + "/barraca/reingreso/registrar_desperdicio/" + me.venta_reingreso_id).then(response => {
           })
             .catch(error => {
               console.log("error en consulta: ", error);
             });
           me.leave_form();
         })
         .catch(function (error) {
           // me.$refs.loading.stop();
           console.log("error validation", error);
          /*  Swal({
             title: 'Error al registrar el Romaneo!',
             text: error.response.data.message,
             type: 'error',
             confirmButtonClass: "btn btn-success",
             buttonsStyling: false
           });
           this.$toast.error("Error al registrar el Romaneo!")
           var er = error.response.data.errors;
           me.errors = er;
         });
     }, */
    leave_form() {
      this.lista_romaneo = [{ "especie": "", "espesor": "", "largo": "", "ancho": "", "seleccionado": false }];
      this.errors = [];
      this.listado = 1;
      this.description = "";
      this.lista_reingresos = "";
      this.venta_reingreso_id = "";
      this.fecha_registro = moment(new Date(), "DD/MM/YYYY").format("YYYY-MM-DD");
    },
    async getEspecies() {
      await axios.get("https://msinventario-zgaud6cq5q-uc.a.run.app/api/especies")
        .then(response => {
          console.log("resp ", response);
          if (response.status === 200) {
            this.select_especies = response.data;
          }
        })
        .catch(error => {
          console.log("error en consulta: ", error);
        });

    },
  },
  mounted() {
    //datos de las especies para rellenar el select
    this.get_cities();
    this.getEspecies();


    this.toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

  },
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
</script>
