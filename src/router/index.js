import Vue from "vue"
import Router from "vue-router"

import login from "~/pages/login"

// 首页
import Home from "~/pages/home"
import Index from "~/pages/index"

// 平台
import User from "~/pages/sys/user/user";
import Role from "~/pages/sys/role/role";
import Menu from "~/pages/sys/menu/menu";
import Dictionary from "~/pages/sys/dictionary/dictionary";

// 监管
import jgwsz from '~/pages/jianguan/wushuizhan/index'  //污水站管理
import jsyz from '~/pages/jianguan/yezhu/index' //业主管理

// 业主
import yzxm from '~/pages/yezhu/xiangmu/index'  //项目管理
import yzwsz from '~/pages/yezhu/wushuizhan/index'  //污水站管理
import yzsb from '~/pages/yezhu/shebei/index'  //设备管理
import yzyw from '~/pages/yezhu/yunwei/index'  //运维管理

// 运维
import ywyz from '~/pages/yunwei/yezhu/index'  //业主管理
import ywwsz from '~/pages/yunwei/wushuizhan/index'  //污水站管理
import ywsb from '~/pages/yunwei/shebei/index'  //设备管理

// import menuList from "./menulist.js"


Vue.use(Router)

const routes = [
    {
        // 首页-控制台
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                // 控制台
                path: '/',
                name: 'Index',
                component: Index
            },

            {
                // 平台-用户管理
                path: "/sys/user/user",
                name: "User",
                component: User,
            },
            {
                // 平台-角色管理
                path: "/sys/role/role",
                name: "Role",
                component: Role,
            },
            {
                // 平台-菜单管理
                path: "/sys/menu/menu",
                name: "Menu",
                component: Menu,
            },
            {
                // 平台-字典管理
                path: "/sys/dictionary/dictionary",
                name: "Dictionary",
                component: Dictionary,
            },

            {
                // 监管-污水站
                path: '/jianguan/wushuizhan',
                name: 'jgwsz',
                component: jgwsz
            },
            {
                // 监管-业主数据
                path: '/jianguan/yezhu',
                name: 'jsyz',
                component: jsyz
            },


            {
                // 业主-项目管理
                path: '/yezhu/xiangmu',
                name: 'yzxm',
                component: yzxm
            },
            {
                // 业主-污水站管理
                path: '/yezhu/wushuizhan',
                name: 'yzwsz',
                component: yzwsz
            },
            {
                // 业主-设备管理
                path: '/yezhu/shebei',
                name: 'yzsb',
                component: yzsb
            },
            {
                // 业主-运维管理-第三方管理
                path: '/yezhu/yunwei/third',
                name: 'yzyw',
                component: yzyw
            },


            {
                // 运维-我的业主方
                path: '/yunwei/yezhu',
                name: 'ywyz',
                component: ywyz
            },
            {
                // 运维-运维污水站
                path: '/yunwei/wushuizhan',
                name: 'ywwsz',
                component: ywwsz
            },
            {
                // 运维-运维设备
                path: '/yunwei/shebei',
                name: 'ywsb',
                component: ywsb
            },
        ]
    },
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: login
    },

    // // 业主方
    // {
    //     path: '/yezhu',
    //     name: 'Index',
    //     component: Index,
    //     children: [
    //         {
    //             // 业主-项目管理
    //             path: '/yezhu/xiangmu',
    //             name: 'yzxm',
    //             component: yzxm
    //         },
    //         {
    //             // 业主-污水站管理
    //             path: '/yezhu/wushuizhan',
    //             name: 'yzwsz',
    //             component: yzwsz
    //         },
    //         {
    //             // 业主-设备管理
    //             path: '/yezhu/shebei',
    //             name: 'yzsb',
    //             component: yzsb
    //         },
    //         {
    //             // 业主-运维管理-第三方管理
    //             path: '/yezhu/yunwei/third',
    //             name: 'yzyw',
    //             component: yzyw
    //         },
    //     ]
    // },

    // // 运维方
    // {
    //     path: '/yunwei',
    //     name: 'Index',
    //     component: Index,
    //     children: [
    //         {
    //             // 运维-我的业主方
    //             path: '/yunwei/yezhu',
    //             name: 'ywyz',
    //             component: ywyz
    //         },
    //         {
    //             // 运维-运维污水站
    //             path: '/yunwei/wushuizhan',
    //             name: 'ywwsz',
    //             component: ywwsz
    //         },
    //         {
    //             // 运维-运维设备
    //             path: '/yunwei/shebei',
    //             name: 'ywsb',
    //             component: ywsb
    //         },
    //     ]
    // },

    // // 监管方
    // {
    //     path: '/jianguan',
    //     name: 'Index',
    //     component: Index,
    //     children: [
    //         {
    //             // 监管-污水站
    //             path: '/jianguan/wushuizhan',
    //             name: 'jgwsz',
    //             component: jgwsz
    //         },
    //         {
    //             // 监管-业主数据
    //             path: '/jianguan/yezhu',
    //             name: 'jsyz',
    //             component: jsyz
    //         },
    //     ]
    // }
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

    if (to.path === '/login') {
        return next()
    }

    const token = window.localStorage.getItem('token')
    if (!token) {
        return next('/login')
    }



    next()
})

export default router;