import Vue from 'vue'
import { WX_ID, MAP_ID } from '@/store/mutation-types'

export default {
  namespaced: true,
  state: {
    wxId: '',
    mapId: '',
    pageTaskDetailTabActive: 1, // 保源详情页tab 默认值
  },

  mutations: {
    SET_WX_ID: (state, wxId) => {
      state.wxId = wxId
      Vue.ls.set(WX_ID, wxId)
    },
    SET_MAP_ID: (state, mapId) => {
      state.mapId = mapId
      Vue.ls.set(MAP_ID, mapId)
    },
    SET_PAGE_TASK_DETAIL_TAB_ACTIVE: (state, ActiveId) => {
      state.pageTaskDetailTabActive = ActiveId
    },
  },

  actions: {},
}
