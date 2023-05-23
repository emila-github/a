import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store'
import {
  VueAxios
} from '@/utils/request'
import '@/router/permission' // permission control
import 'amfe-flexible'
import {
  Button,
  Cell,
  CellGroup,
  Calendar,
  Checkbox,
  CheckboxGroup,
  Col,
  DatetimePicker,
  Dialog,
  Divider,
  Empty,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  List,
  NavBar,
  Notify,
  Panel,
  Popup,
  Sticky,
  Stepper,
  Switch,
  Picker,
  Radio,
  RadioGroup,
  Row,
  Search,
  SwipeCell,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  Uploader,
} from 'vant'

import config from '@/config/defaultSettings'
// import { WX_ID } from '@/store/mutation-types'
// import VConsole from 'vconsole'

import {
  hasPermission,
  hasNoPermission,
  hasAnyPermission,
  hasPermissionMenu
} from './directive/permissionDirect'

// if (process.env.NODE_ENV !== 'production') {
//   let vConsole = new VConsole()
//   Vue.use(vConsole)
// }

const Plugins = [hasPermission, hasNoPermission, hasAnyPermission, hasPermissionMenu]

Plugins.map(plugin => {
  Vue.use(plugin)
})
Vue.use(Storage, config.storageOptions)
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Calendar)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Col)
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Field)
Vue.use(Form)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Icon)
Vue.use(List)
Vue.use(NavBar)
Vue.use(Notify)
Vue.use(Panel)
Vue.use(Picker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Popup)
Vue.use(Search)
Vue.use(Sticky)
Vue.use(Stepper)
Vue.use(Switch)
Vue.use(SwipeCell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Tag)
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(VueAxios, router)
import 'ant-design-vue/dist/antd.css'
import {
  Table
} from 'ant-design-vue'
Vue.use(Table)
Vue.config.productionTip = false

// Vue.ls.set(WX_ID, config.wxId)
store.commit('app/SET_WX_ID', process.env.VUE_APP_WX_ID)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')