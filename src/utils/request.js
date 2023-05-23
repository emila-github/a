import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
// eslint-disable-next-line no-unused-vars
import { Dialog, Notify } from 'vant'
import { ACCESS_TOKEN, AUTH_ID } from '@/store/mutation-types'

//console.log('process.env: ', process.env)
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_INVOICE_BASE_URL, // api base_url  '/wx'
  timeout: 30000, // 请求超时时间
})

const err = error => {
  if (error.response) {
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    console.log('------异常响应------', token)
    console.log('------异常响应------', error.response.status)
    switch (error.response.status) {
      case 403:
        Notify({ type: 'danger', message: '系统提示:拒绝访问', duration: 4000 })

        break
      case 510:
        if (token) {
          Notify({ type: 'danger', message: '系统提示:登录超时，重新登录...', duration: 4000 })
          setTimeout(() => {
            Vue.ls.remove(ACCESS_TOKEN)
            store.commit('user/SET_TOKEN', '')
            Vue.ls.remove(AUTH_ID)
            window.location.reload()
          }, 500)
          // Dialog.confirm({
          //   title: '登录已过期',
          //   message: '很抱歉，登录已过期，请重新登录',
          //   confirmButtonText: '重新登录',
          // }).then(() => {
          //   // store.dispatch('logout').then(() => {
          //   Vue.ls.remove(ACCESS_TOKEN)
          //   store.commit('SET_TOKEN', '')
          //   window.location.reload()
          //   // })
          // })
        }
        break
      case 404:
        Notify({ type: 'danger', message: '系统提示:很抱歉，资源未找到!', duration: 4000 })
        break
      case 504:
        Notify({ type: 'danger', message: '系统提示:网络超时!', duration: 4000 })
        break
      case 401:
        Notify({ type: 'danger', message: '系统提示:未授权，请重新登录!', duration: 4000 })
        if (token) {
          // store.dispatch('logout').then(() => {
          setTimeout(() => {
            Vue.ls.remove(ACCESS_TOKEN)
            Vue.ls.remove(AUTH_ID)
            window.location.reload()
          }, 500)
          // })
        }
        break
      default:
        Notify({ type: 'danger', message: `系统提示:${data.message}!`, duration: 4000 })
        break
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(
  config => {
    console.log('request config', config)
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    if (config.method == 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params,
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  },
}

export { installer as VueAxios, service as axios }
