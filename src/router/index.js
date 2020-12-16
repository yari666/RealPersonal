import Vue from "vue"
import Router from "vue-router"

import login from "~/pages/login"

// 首页
import Home from "~/pages/home"
import Index from "~/pages/index"

// 访客管理
import GuestUser from '~/pages/guest/guest-user/index';   //人员管理
import GuestClass from '~/pages/guest/guest-class/index';  //班组管理

import Maganer from '~/pages/user/manager/index';
import MaganerDetail from '~/pages/user/manager/detail/index';

import Worker from '~/pages/user/worker/index';
import WorkerDetail from '~/pages/user/worker/detail/index';

import Project from '~/pages/project/index';
import Company from '~/pages/company/index';

import WorkcheckUser from '~/pages/workcheck/user/index';  //人员考勤
import WorkcheckClockin from '~/pages/workcheck/clockin/index';
import WorkcheckReportform from '~/pages/workcheck/reportform/index';

import Device from '~/pages/device/index'
import Api from '~/pages/api/index'
import Operation from '~/pages/operation/index'

import Menu from '~/pages/sys/menu/index'
import Role from '~/pages/sys/role/index'
import Account from '~/pages/sys/account/index'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [

            // 首页
            {
                path: '/',
                name: 'Index',
                component: Index
            },
            // 项目管理
            {
                path: '/project',
                name: 'Project',
                component: Project
            },
            // 企业管理
            {
                path: '/company',
                name: 'Company',
                component: Company
            },
            // 人员管理
            {
                path: '/user/manager',
                name: 'Maganer',
                component: Maganer
            },
            {
                path: '/user/managerdetail',
                name: 'MaganerDetail',
                component: MaganerDetail
            },
            {
                path: '/user/worker',
                name: 'Worker',
                component: Worker
            },
            {
                path: '/user/workerdetail',
                name: 'WorkerDetail',
                component: WorkerDetail
            },
            // 访客管理
            {
                path: '/guest/guestuser',
                name: 'GuestUser',
                component: GuestUser
            },
            {
                path: '/guest/guestclass',
                name: 'GuestClass',
                component: GuestClass
            },
            //考勤管理
            {
                path: '/workcheck/user',
                name: 'WorkcheckUser',
                component: WorkcheckUser
            },
            {
                path: '/workcheck/clockin',
                name: 'WorkcheckClockin',
                component: WorkcheckClockin
            },
            {
                path: '/workcheck/reportform',
                name: 'WorkcheckReportform',
                component: WorkcheckReportform
            },
            {
                path: '/device',
                name: 'Device',
                component: Device
            },
            {
                path: '/api',
                name: 'Api',
                component: Api
            },
            {
                path: '/userdata',
                name: 'Api',
                component: Api
            },
            {
                path: '/operation',
                name: 'Operation',
                component: Operation
            },
            // 账号管理
            {
                path: '/sys/menu',
                name: 'Menu',
                component: Menu
            },
            {
                path: '/sys/role',
                name: 'Role',
                component: Role
            },
            {
                path: '/sys/account',
                name: 'Account',
                component: Account
            },
        ]
    },
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: login
    },
];



const router = new Router({
    // mode: 'history',
    routes
});

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
    // to将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示方行
    // next() 放行    next(/login) 强行跳转

    // if (to.path === '/login') {
    //     return next()
    // }

    // const token = window.localStorage.getItem('token')
    // if (!token) {
    //     return next('/login')
    // }



    next()
})

export default router;