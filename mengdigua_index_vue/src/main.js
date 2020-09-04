import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Carousel, CarouselItem, Input, Radio, Divider, Cascader, Message, Upload, Dialog,
  DatePicker, Loading ,Table,TableColumn,Tabs,TabPane

} from 'element-ui';

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {

  // 方法1：通过在路由元信息中添加登陆验证字段来实现进入某个页面时是否需要验证登录
  if (to.path == '/regpart3' || to.path == '/regpart2' || to.path == '/regpart1' || to.path == '/regresult') { // 判断路由元信息中是否添加登陆验证字段
    // 判断 sessionStorage 中是否有登陆信息，如果已经有登陆信息，则放行

 
    if (store.state.token) {
      next()
    }
    else {
      router.push("/")
    }
  }
  else {
    next()
  }
})
Vue.use(Table).use(TableColumn).use(Tabs).use(TabPane)
Vue.use(Carousel).use(CarouselItem).use(Input).use(Radio).use(Divider).use(Cascader).use(Upload).use(Dialog).use(DatePicker);
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
