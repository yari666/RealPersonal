import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
var user = window.localStorage.getItem('userInfo');
var userInfo = user ? JSON.parse(user) : {};

const store = new Vuex.Store({
    state: {
        userInfo: {
            userId: userInfo && userInfo.userId || "",
            userName: userInfo && userInfo.userName || "",
            userType: userInfo && userInfo.userType || 0,   //角色  1业主，2运维 3监管 4超级管理员
            companyId: userInfo && userInfo.companyId || "",

            belongProvince: userInfo && userInfo.belongProvince || null,  //所属省 
            belongCity: userInfo && userInfo.belongCity || null,  //所属市
            belongTownship: userInfo && userInfo.belongTownship || null,  //所属区
        },
        province: null,
        city: null,
        township: null
    },
    mutations: {
        setUserInfo(state, params) {
            if (params && params.userType) {
                state.userInfo.userId = params.userId;
                state.userInfo.userName = params.userName;
                state.userInfo.userType = params.userType;
                state.userInfo.companyId = params.companyId;
                state.userInfo.belongProvince = params.belongProvince;
                state.userInfo.belongCity = params.belongCity;
                state.userInfo.belongTownship = params.belongTownship;

                window.localStorage.setItem("token", params.accessToken);
                window.localStorage.setItem('userInfo', JSON.stringify(params));

            } else {
                state.userInfo = {
                    userId: "",
                    userName: "",
                    userType: 0,
                    companyId: "",
                    belongProvince: null,
                    belongCity: null,
                    belongTownship: null,
                };
                window.localStorage.setItem("token", '');
                window.localStorage.setItem('userInfo', '');

            }
        }
    }
})

export default store