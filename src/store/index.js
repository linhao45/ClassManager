import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: '123',
        downloadURL: 'http://test1.jitclass.cn/file/a/download/',
        baseURL: 'http://test1.jitclass.cn',
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
