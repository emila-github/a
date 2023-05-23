import { getUserInfo, getAuthUrl } from '@/api/index'
import vue from 'vue'
import { WX_ID } from '@/store/mutation-types'
import cookie from './cookie'
import { Notify } from 'vant'
import { getUrlParam } from './util'

/**
 * 微信授权
 */
export default function wxAuth() {
  return new Promise((resolve, reject) => {
    let openid = cookie.get('openid')
    if (openid) {
      resolve(openid)
      return
    }
    let code = getUrlParam('code')
    if (!code) {
      //未经过微信授权
      let redirctUri = encodeURIComponent(window.location.href)

      let wxId = vue.ls.get(WX_ID)

      getAuthUrl({
        wxId: wxId,
        redirect: redirctUri,
      }).then(res => {
        if (res.code == 200) {
          Notify({ type: 'primary', message: '微信授权开始' })

          location.href = res.data
        } else {
          Notify({ type: 'danger', message: '微信授权openid失败' })
          reject(res)
        }
      })
    } else {
      getUserInfo({
        wxId: vue.ls.get(WX_ID),
        code: code,
      }).then(res => {
        if (res.code == 200) {
          Notify({ type: 'primary', message: '登录成功' })
          resolve(res.result)
        } else {
          Notify({ type: 'danger', message: '登录失败' })
          reject(res)
        }
      })
    }
  })
}
