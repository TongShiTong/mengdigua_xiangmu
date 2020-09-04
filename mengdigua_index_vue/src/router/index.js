import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      keepAlive: false,
      header_type: 0,//头部样式


    },
    component: Login
  },
  
  {
    path: '/login',
    redirect: "/",
  },


  {
    path: '/regpart1',
    name: 'regpart1',
    meta: {
      keepAlive: false,
      header_type: 0,//头部样式



    },
    component: () => import('./../views/regPart1.vue')
  },
  {
    path: '/regpart2',
    name: 'regpart2',
    meta: {
      keepAlive: false,
      header_type: 0,//头部样式

    },
    component: () => import('./../views/regPart2.vue')
  },
  {
    path: '/regpart3',
    name: 'regpart3',
    meta: {
      keepAlive: false,
      header_type: 0,//头部样式
      nav_type: 0,//nav样式
      is_fixed: false//固定框

    },
    component: () => import('./../views/regPart3.vue')
  },
  {
    path: '/regresult',
    name: 'regresult',
    meta: {
      keepAlive: false,
      header_type: 0,//头部样式
      nav_type: 0,//nav样式
      is_fixed: false//固定框

    },
    component: () => import('./../views/regResult.vue')
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  routes
})

export default router
