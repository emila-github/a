/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/index.vue'),
    redirect: '/test-a',
  },


  {
    path: '/test-a',
    name: 'ATest',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/index.vue'),
    meta: {
      title: '交易记录'
    }
  },
  {
    path: '/test-currDay',
    name: 'ATestCurrDay',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/currDay/index.vue'),
    meta: {
      title: '普通交易'
    }
  },
  {
    path: '/test-currDay-History',
    name: 'ATestCurrDayHistory',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/currDay/History/index.vue'),
    meta: {
      title: '清仓股票'
    }
  },
  {
    path: '/test-currDay-History-Detail',
    name: 'ATestCurrDayHistoryDetail',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/currDay/History/Detail/index.vue'),
    meta: {
      title: '交易明细'
    }
  },
  {
    path: '/test-history',
    name: 'ATestHistory',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/history/index.vue'),
    meta: {
      title: '历史交易'
    }
  },
  {
    path: '/test-computer',
    name: 'ATestComputer',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/computer/index.vue'),
    meta: {
      title: '计算'
    }
  },
  {
    path: '/test-computerSaleRecords',
    name: 'ATestComputerSaleRecords',
    component: () => import( /* webpackChunkName: "test-a" */ '@/views/ATest/computerSaleRecords/index.vue'),
    meta: {
      title: '计算2'
    }
  },

  {
    path: '*',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/404'),
  },
]