import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animated from 'animate.css'

import less from 'less'
import router from "./router"
import store from './store'

import App from './App'

import Axios from "./config/axios";


// 使用axios
Vue.prototype.$http = Axios;

Vue.use(ElementUI)
Vue.use(less)
Vue.use(animated)

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
