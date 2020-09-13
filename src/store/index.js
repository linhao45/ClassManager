import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      username: '123',
      downloadURL: 'http://api.jitclass.cn/file/a/download/',
  },
  mutations: {
      setUsername(state, username) {
          state.username = username
      }
  },
  actions: {
  },
  modules: {
  },
  strict: true
})
