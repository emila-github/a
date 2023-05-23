/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == 'object')) {
    return
  }

  for (var key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      (obj[key] == null || obj[key] == undefined || obj[key] === '')
    ) {
      delete obj[key]
    }
  }
  return obj
}

//获取当前页面url中的参数
export function getUrlParam(key) {
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  var result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : ''
}

export function isWeixinBrowser() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    console.info('非微信浏览器')
    return false
  }
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}


/**
 *判断对象是否是一个纯粹的对象
 */
export function isPlainObject(obj) {
  return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 *深度合并多个对象的方法
 */
export function deepAssign() {
  let len = arguments.length,
    target = arguments[0]
  if (!isPlainObject(target)) {
    target = {}
  }
  for (let i = 1; i < len; i++) {
    let source = arguments[i]
    if (isPlainObject(source)) {
      for (let s in source) {
        if (s === '__proto__' || target === source[s]) {
          continue
        }
        if (isPlainObject(source[s])) {
          target[s] = deepAssign(target[s], source[s])
        } else {
          target[s] = source[s]
        }
      }
    }
  }
  return target
}

// 初始化下拉框
export function initSelectDatas(options = [], self = this) {
  options.map(option => {
    const {
      action,
      varName,
      requestParams = {}
    } = option
    if (action && typeof eval(action) == 'function' && varName) {
      action(requestParams).then(res => {
        const {
          success,
          result
        } = res
        if (success) {
          self.selectDatas[varName] = result
          option.success && option.success(res)
        }
      })
    }
  })
}

export function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export function formatDate(date, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}