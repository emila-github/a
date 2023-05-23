import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: process.env.VUE_APP_CONTEXT_PATH,
  //scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})

export default router
