import Vue from 'vue'
import {
  getUserInfo,
  getAuthUrl,
  queryPermissionsByUser
} from '@/api/index'
import {
  ACCESS_TOKEN,
  AUTH_ID,
  WX_ID,
  SYS_BUTTON_AUTH,
  SYS_MENU_AUTH
} from '@/store/mutation-types'
// import cookie from '@/utils/cookie'
import {
  Notify
} from 'vant'
import {
  getUrlParam
} from '@/utils/util'

const expiresIn = 3500 // 有效期
function getTreeName(tree) {
  let names = []
  tree.map(item => {
    if (item.name) {
      names.push(item.name)
    }
    if (item.children && item.children.length) {
      names.push(...getTreeName(item.children))
    }
  })
  return names
}

const user = {
  namespaced: true,
  state: {
    token: '',
    authId: '', // 没有有效期 用于换取token
    redirect: '',
    buttonAuth: [], // 权限按钮集合
    menuAuth: [], // 菜单name集合
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AUTHID: (state, authId) => {
      state.authId = authId
    },
    SET_REDIRECT: (state, redirect) => {
      // 缓存跳转地址
      state.redirect = redirect
    },
    SET_SYS_BUTTON_AUTH: (state, buttonAuth) => {
      // 按钮权限
      state.buttonAuth = buttonAuth
    },
    SET_SYS_MENU_AUTH: (state, menuAuth) => {
      // 菜单权限
      state.menuAuth = menuAuth
    },
  },

  actions: {
    // 登录
    login({
      commit
    }) {
      return new Promise((resolve, reject) => {
        let token = Vue.ls.get(ACCESS_TOKEN)
        let authId = Vue.ls.get(AUTH_ID)

        token =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM3MDc5NTUsInVzZXJuYW1lIjoiMTM0MDU5Njc2ODYifQ.7I4Ira2_qGz2MgzebUVUdlENnbgcHaDvy6hnfXf1hxc'
        Vue.ls.set(ACCESS_TOKEN, token, expiresIn * 1000)

        if (token) {
          resolve({
            token,
          })
          return
        }
        // 缓存未登录的跳转地址
        let redirect = getUrlParam('redirect')
        if (redirect) {
          commit('SET_REDIRECT', redirect)
        }

        let code = getUrlParam('code')
        if (!code && !authId) {
          Notify({
            type: 'primary',
            message: '发起授权...',
          })

          let redirctUri = encodeURIComponent(window.location.href)

          let wxId = Vue.ls.get(WX_ID)

          getAuthUrl({
              wxId: wxId,
              redirect: redirctUri,
            })
            .then(res => {
              if (res.code == 200) {
                Notify({
                  type: 'primary',
                  message: '微信授权开始...',
                })

                location.href = res.data
              } else {
                Notify({
                  type: 'danger',
                  message: '微信授权openId失败',
                })
                commit('SET_TOKEN', '')
                commit('SET_AUTHID', '')
                Vue.ls.remove(ACCESS_TOKEN)
                Vue.ls.remove(AUTH_ID)
                reject(res)
              }
            })
            .catch(err => {
              Notify({
                type: 'danger',
                message: '未知异常，请联系管理员[授权地址异常]' + err,
              })
              commit('SET_TOKEN', '')
              commit('SET_AUTHID', '')
              Vue.ls.remove(ACCESS_TOKEN)
              Vue.ls.remove(AUTH_ID)
              reject(err)
            })
        } else {
          Notify({
            type: 'primary',
            message: '登录中...',
          })
          let params = {
            wxId: Vue.ls.get(WX_ID),
          }
          if (authId) {
            params.authId = authId
          } else if (code) {
            params.code = code
          }
          getUserInfo(params)
            .then(res => {
              let {
                code,
                result
              } = res
              if (code == 200 && result && result.token) {
                Notify({
                  type: 'primary',
                  message: '登录成功',
                })
                commit('SET_TOKEN', result.token)
                commit('SET_AUTHID', result.authId)

                Vue.ls.set(ACCESS_TOKEN, result.token, expiresIn * 1000)
                Vue.ls.set(AUTH_ID, result.authId)
                resolve(res.result)
              } else {
                let {
                  msg = '登录失败'
                } = res

                Notify({
                  type: 'danger',
                  message: msg,
                })
                commit('SET_TOKEN', '')
                commit('SET_AUTHID', '')
                Vue.ls.remove(ACCESS_TOKEN)
                Vue.ls.remove(AUTH_ID)
                reject(res)
              }
            })
            .catch(err => {
              console.log('getUserInfo err', err)
              Notify({
                type: 'danger',
                message: '未知异常，请联系管理员[获取用户信息异常]' + err,
              })
              commit('SET_TOKEN', '')
              commit('SET_AUTHID', '')
              Vue.ls.remove(ACCESS_TOKEN)
              Vue.ls.remove(AUTH_ID)
              reject(err)
            })
        }
      })
    },

    // 登出
    // eslint-disable-next-line no-unused-vars
    logout({
      commit,
      state
    }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
        //console.log('logoutToken: '+ logoutToken)
      })
    },

    // 获取用户信息
    getPermissionList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        let v_token = Vue.ls.get(ACCESS_TOKEN)
        let params = {
          token: v_token,
          subSysCode: 'invoice-mgt',
        }
        // console.log('获取用户信息, params: ', params)
        queryPermissionsByUser(params)
          .then(response => {
            // console.log('请求用户信息成功 res: ', response)

            const authData = response.result.auth
            const menuData = response.result.menu
            let menuNames = getTreeName(menuData)
            // console.log('存储用户信息数据')
            Vue.ls.set(SYS_BUTTON_AUTH, authData, expiresIn * 1000)
            Vue.ls.set(SYS_MENU_AUTH, menuNames, expiresIn * 1000)
            commit('SET_SYS_BUTTON_AUTH', authData)
            commit('SET_SYS_MENU_AUTH', menuNames)

            resolve(response)
          })
          .catch(error => {
            console.log('resolve response fail: ', error)
            reject(error)
          })
      })
    },
  },
}

export default user