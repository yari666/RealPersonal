import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


var token = window.localStorage.getItem('token');
var userId = window.localStorage.getItem('userId');
var userName = window.localStorage.getItem('userName');
var isAdd = window.localStorage.getItem('isAdd');
const store = new Vuex.Store({
    state: {
        userId,
        userName,
        token,
        isAdd
    },
    mutations: {
        setUserInfo(state, params) {
            state.userId = params.userId;
            state.userName = params.userName;
            state.token = params.token
            state.isAdd = params.isAdd
        }
    }
})

export default store