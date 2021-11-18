import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters.js'

// 安装
Vue.use(Vuex)

// 创建store对象

const state = {
    CartList: []
 }

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 挂载vue实例
export default store
