import {
  getAction,
  postAction,
  putAction,
  deleteAction
} from '@/api/manage'

const wxBaseURL = process.env.VUE_APP_BASE_URL // 微信相关
// const isBaseURL = process.env.VUE_APP_INVOICE_BASE_URL // 保源相关
console.log('wxBaseURL====', wxBaseURL)
const WXBaseUri = ''

// 获取股票信息
export const getA = params => getAction(`${WXBaseUri}/utf8/`, params, {
  baseURL: wxBaseURL
})

// 沪深300
export const getA300 = params => getAction(`${WXBaseUri}/api/qt/stock/kline/get?secid=1.000300&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1&end=20500101&lmt=120&_=1684196569585`, Object.assign({}, params), {
  baseURL: wxBaseURL
})