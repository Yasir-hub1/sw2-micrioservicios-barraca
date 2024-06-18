import Vue from "vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

import axios from "axios";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faVuejs } from "@fortawesome/free-brands-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'mdbootstrap/css/mdb.css';

library.add(faVuejs, faEdit);

Vue.component('fa', FontAwesomeIcon);
/*
let token = localStorage.getItem("token");

if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token; */
Vue.use(BootstrapVue);
Vue.use(ToastPlugin);
Vue.use(PaperDashboard);
Vue.use(require('vue-moment'));

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
