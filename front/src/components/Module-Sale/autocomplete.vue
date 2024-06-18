<template>
  <div>
    <input type="text" @input="onChange" v-model="search" @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter"  class="form-control"/>
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li class="loading" v-if="isLoading">
        Loading results...
      </li>
      <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
        {{toString(result)}}
      </li>
    </ul>

  </div>
</template>
<script>
import { text } from '@fortawesome/fontawesome-svg-core';
import axios from "axios";
/**
 * modificaciones en al autocomplete
 * Al actualizar y cargar un form de edicion con el componente autocomplete no se actulizaba el parametro search,
 * por que al iniciar el componente estaba asi =>  search:'',
 */
 export default{
  name: "autocomplete",
  props: {
    url: {
      type: String,
      required: false,
      default: ""
    },
    params_show: {
      type: Array,
      required: false,
      default: []
    },
    params_label: {
      type: Array,
      required: false,
      default: []
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    data: {
      type: String,
      required: false,
      default: false
    },
    validation: {
      type: String,
      required: false,
      default: ''
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: 0
    };
  },

  methods: {
    autoComplete(){
        this.results = [];
        // this.errors = [];
        if(this.search.length > 0){
            axios
            .get(this.url,{params: {search: this.search}})
            .then(response => {
                this.results = response.data;
                // this.filterResults();
                // if(this.results.length==0){
                    // if(this.errors.error){

                    // }else{
                        this.not_exist_data();
                    // }
                // }
            });
        }
    },
    not_exist_data(){
      console.log('*');
      // this.errors['error']='no existe';
      this.$emit('not_exist_data',this.search);
    },
     /**
    *muestra todos los campos que el usuario desea mostarar en el componente
    *@object objeto del cual se mostrataran los campos
    * */
    toString(object){
        var result = "";
        var j=0;
        var gion=" — ";
            for (var i in object) {
                if(j==this.params_label.length-1){
                    gion="";
                }
                if(this.existe(i)){
                    result += ""+this.params_label[j]+":" + object[i] + gion;
                    j++;
                }
            }
            return result;
    },
    /**
        * verifica la existencia del campo el arreglo de parametros
        * @field campo que se verificara
        *
        * */
    existe(field){
        for(var i in this.params_show){
            if(this.params_show[i]==field){
                return true;
            }
        }
        return false;
    },
    setResult(result){
       console.log(result);
       this.search=result[this.label];
       this.$emit('clickedSomething:change',result);
       this.results=[];
   },
    onChange() {
    //   // Let's warn the parent that a change was made
      this.$emit("input", this.search);

    //   // Is the data given by an outside ajax request?
    //   if (this.isAsync) {
    //     this.isLoading = true;
    //   } else {
    //     // Let's search our flat array
    //     this.filterResults();
        this.isOpen = true;
    //   }
    },

    filterResults() {
      // first uncapitalize all the things
      this.results = this.items.filter(item => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    // setResult(result) {
    //   this.search = result;
    //   this.isOpen = false;
    // },
    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
        //   this.search = this.results[this.arrowCounter];
      this.setResult(this.results[this.arrowCounter]);
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  watch: {
    // items: function(val, oldValue) {
    //   // actually compare them
    //   if (val.length !== oldValue.length) {
    //     this.results = val;
    //     this.isLoading = false;
    //   }
    // },
    search:function(val){
        if (val!='') {
            this.autoComplete();
        }
    },
    data:function(val){
        this.search=val;
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
}

</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.autocomplete {
  position: relative;
  width: 130px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: auto;
  overflow: auto;
  width: 100%;
  float: left;
  position: absolute;
  background: #dfe4e7;
  z-index: 99;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #337ab7;
  color: white;
}

</style>
