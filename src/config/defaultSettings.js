/**
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

const INVOICE_BASE_URL = process.env.VUE_APP_INVOICE_BASE_URL

export default {
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
  },
  // 图片根路径
  imgBaseUrl: `${INVOICE_BASE_URL}`,
}
