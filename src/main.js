import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../src/assets/css/global.css'
import axios from 'axios'
import store from './store'
// 导入nprogress包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

// 配置请求根路径
axios.defaults.baseURL = 'http://api.jitclass.cn'

// 在request拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
    NProgress.start();
    config.headers.token = window.sessionStorage.getItem('token');
    return config
})

// 在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done();
    return config;
})

Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')