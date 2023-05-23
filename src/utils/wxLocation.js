// import { WX_ID } from '@/store/mutation-types'
import { isWeixinBrowser } from '@/utils/util'
import { getSignature } from '@/api/index'

/**
 * 微信授权
 */
export default function wxLocation(page) {
  if (!isWeixinBrowser()) {
    return
  }
  loadSignature()
  wx.ready(function() {
    console.log('todo ready loadSignature')
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function(res) {
        console.log('getLocation res', res)
        // let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
        // let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
        // let speed = res.speed // 速度，以米/每秒计
        // let accuracy = res.accuracy // 位置精度
        page.location = res
      },
    })
  })
  wx.error(err => {
    console.log(err)
  })
}

export function loadSignature() {
  if (sessionStorage.signature) {
    let signature = JSON.parse(sessionStorage.signature)
    setShareConfig(signature)
    return
  }
  getSignature({}).then(res => {
    if (res.code != 200) {
      return
    }
    sessionStorage.signature = JSON.stringify(res.data)
    setShareConfig(res.data)
  })
}

function setShareConfig(signature) {
  console.log('todo setShareConfig')
  wx.config({
    beta: true,
    debug: false,
    appId: signature.corpId,
    timestamp: signature.timestamp,
    nonceStr: signature.nonceStr,
    signature: signature.signature,
    jsApiList: ['openLocation', 'getLocation', 'invoke', 'onLocationChange'],
  })
}
