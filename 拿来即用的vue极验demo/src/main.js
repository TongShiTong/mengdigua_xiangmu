import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
Vue.prototype.axios = axios;
// 导入极验
require('@/assets/gt.js');
// 绑定到原型
Vue.prototype.$initGeet=initGeetest;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
