import Vue from "vue"
import Router from "vue-router"


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('~/pages/home'),
        redirect: '/home',
        children: [

            // 首页
            {
                path: '/home',
                name: 'Index',
                component: () => import('~/pages/index'),
            },
            // 项目管理
            {
                path: '/project',
                name: 'Project',
                component: () => import('~/pages/project/index'),
            },
            // 企业管理
            {
                path: '/company',
                name: 'Company',
                component: () => import('~/pages/company/index'),
            },
            // 人员管理
            {
                path: '/user/manager',
                name: 'Maganer',
                component: () => import('~/pages/user/manager/index'),
            },
            {
                path: '/user/manager/:employeeId',
                name: 'UserDetail',
                component: () => import('~/pages/userdetail/index'),
            },
            {
                path: '/user/worker',
                name: 'Worker',
                component: () => import('~/pages/user/worker/index'),
            },
            {
                path: '/user/worker/:employeeId',
                name: 'UserDetail',
                component: () => import('~/pages/userdetail/index'),
            },
            // 访客管理
            {
                path: '/guest/guestuser',
                name: 'GuestUser',
                component: () => import('~/pages/guest/guest-user/index'),
            },
            {
                path: '/guest/guestclass',
                name: 'GuestClass',
                component: () => import('~/pages/guest/guest-class/index'),
            },
            //考勤管理
            {
                path: '/workcheck/user',
                name: 'WorkcheckUser',
                component: () => import('~/pages/workcheck/user/index'),
            },
            {
                path: '/workcheck/clockin',
                name: 'WorkcheckClockin',
                component: () => import('~/pages/workcheck/clockin/index'),
            },
            {
                path: '/workcheck/reportform',
                name: 'WorkcheckReportform',
                component: () => import('~/pages/workcheck/reportform/index'),
            },
            // 设备管理
            {
                path: '/device',
                name: 'Device',
                component: () => import('~/pages/device/index'),
            },
            // api管理
            {
                path: '/api',
                name: 'Api',
                component: () => import('~/pages/api/index'),
            },
            // 人员库
            {
                path: '/userdata',
                name: 'Userdata',
                component: () => import('~/pages/userdata/index'),
            },
            // 操作日志
            {
                path: '/operation',
                name: 'Operation',
                component: () => import('~/pages/operation/index'),
            },
            // 账号管理
            {
                path: '/sys/menu',
                name: 'Menu',
                component: () => import('~/pages/sys/menu/index'),
            },
            {
                path: '/sys/role',
                name: 'Role',
                component: () => import('~/pages/sys/role/index'),
            },
            {
                path: '/sys/account',
                name: 'Account',
                component: () => import('~/pages/sys/account/index'),
            },
            {
                path: '/sys/worktype',
                name: 'WorkType',
                component: () => import('~/pages/sys/worktype/index'),
            }

        ]
    },
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: () => import('~/pages/login')
    },
];



const router = new Router({
    // mode: 'history',
    routes
});

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {

    var token = window.localStorage.getItem('token')

    if (to.path === '/login') {
        next()
    } else {
        if (token) {
            next()
        } else {
            next('/login')
        }
    }
})


export default router;