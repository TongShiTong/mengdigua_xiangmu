import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
if (process.env.NODE_ENV === 'development') { // 测试用
  // http://lantian-api-test.netmi.com.cn
  // http://merchant-api-f.netmi.com.cn
  // axios.defaults.baseURL = 'http://ysjp.yushanjia.com'
  // axios.defaults.baseURL = 'http://merchant-api-test.netmi.com.cn' // 测试环境
  // axios.defaults.baseURL = 'https://shop-api.netmi.com.cn' // 开发环境
  axios.defaults.baseURL = '/api' // 开发环境
} else {
  axios.defaults.baseURL = window.location.origin
}

const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.errcode !== 0) {
      return response
      // console.log(res.errmsg)
      // return Promise.reject(res.errmsg)
    } else {
      if (response.data.data) {
        return response
      } else {
        response.data['data'] = ''
        return response
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
