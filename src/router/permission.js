import Vue from 'vue'
import router from './index'
import store from '../store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 进度条配置 Configuration
NProgress.configure({
  showSpinner: false
})

// 白名单
const whiteList = [
  '/',
  '/test-a',
  '/test-currDay',
  '/test-history',
  '/test-computer',
  '/test-computerSaleRecords',
  '/test-currDay-History',
  '/test-currDay-History-Detail',
  '/menu',
  '/test-font',
  '/share-login/:taskId',
  '/share-task/:taskId',
  '/share-add-invoice/:taskId',
  '/share-edit-invoice/:taskId/:id',
]
// m61u

router.beforeEach((to, from, next) => {
  console.log('to===', to)
  if (to.meta.title) { // 判断是否有标题
    document.title = to.meta.title;
  }
  // 启动进度条栏
  NProgress.start()
  console.log('route from: ', from)
  console.log('route to: ', to)
  console.log('next: ', next)
  // 判断是否token 存在
  if (Vue.ls.get(ACCESS_TOKEN)) {
    console.log('flag true-> 直接进入')
    if (to.path === '/') {
      console.log('跳转页面为 登录页')
      next({
        path: '/menu'
      })
      NProgress.done()
    } else {
      let buttonAuth = store.state.user.buttonAuth
      // 获取权限
      if (!buttonAuth || !buttonAuth.length) {
        store
          .dispatch('user/getPermissionList')
          .then(() => {
            next()
            NProgress.done()
          })
          .catch(err => {
            console.log('获取收取出错', err)
          })
      } else {
        next()
        NProgress.done()
      }
    }
  } else {
    console.log('ACCESS_TOKEN not exist')
    let {
      path
    } = to.matched[0]
    if (whiteList.indexOf(to.path) !== -1 || whiteList.indexOf(path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  // 结束进度条栏
  NProgress.done()
})