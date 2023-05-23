import { SHARE_TOKEN } from '@/store/mutation-types'
import { shareLogin } from '@/api/index'

const share = {
  namespaced: true,
  state: {
    shareToken: '',
  },

  mutations: {
    SET_TOKEN: (state, shareToken) => {
      state.shareToken = shareToken
    },
  },
  actions: {
    // 登录
    shareLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        shareLogin(userInfo)
          .then(res => {
            let { success, result } = res
            if (success) {
              let { shareToken } = result
              commit('SET_TOKEN', shareToken)
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}

export default share
