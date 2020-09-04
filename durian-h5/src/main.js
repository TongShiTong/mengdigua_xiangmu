import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
Vue.prototype.axios = axios;
// import "./pxrem";

import { getToken } from "./store/user";
import enter from "./utils/checkFirstTime";
require('../src/api/gt.js')
const token = getToken();
if(token){
  enter.setEnter();
}
Vue.prototype.$initGeet = initGeetest
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
