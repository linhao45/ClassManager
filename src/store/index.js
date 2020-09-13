import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      username: '123'
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
