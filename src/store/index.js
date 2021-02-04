import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


var token = window.localStorage.getItem('token');
var userId = window.localStorage.getItem('userId');
var userName = window.localStorage.getItem('userName');
const store = new Vuex.Store({
    state: {
        userId,
        userName,
        token
    },
    mutations: {
        setUserInfo(state, params) {
            state.userId = params.userId;
            state.userName = params.userName;
            state.token = params.token
        }
    }
})

export default store