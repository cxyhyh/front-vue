import Vue from 'vue'
import VueRouter from 'vue-router'
import Button from 'ant-design-vue'
//Home
import index from './views/Home/index.vue'
//Admin
import companyInfo from './views/Pages/Admin/companyInfo.vue'
import home from './views/Pages/Admin/home.vue'
import jobInfo from './views/Pages/Admin/jobInfo.vue'
import register from './views/Pages/Admin/register.vue'
import skillInfo from './views/Pages/Admin/skillInfo.vue'
import success from './views/Pages/Admin/success.vue'
import userInfo from './views/Pages/Admin/userInfo.vue'
import jianLiInfo from './views/Pages/Admin/jianLiInfo.vue'
import applicationInfo from './views/Pages/Admin/applicationInfo.vue'
//fail
import f404 from './views/Pages/fail/404.vue'
//role
import role from './views/Pages/role/role.vue'
//User
import userIndex from './views/Pages/User/userIndex.vue'
import zpInfo from './views/Pages/User/zpInfo.vue'
import logo from './views/Pages/User/logo.vue'
import qyInfo from './views/Pages/User/qyInfo.vue'
import zpLiuChen from './views/Pages/User/zpLiuChen.vue'
import detail from './views/Pages/User/detail.vue'
//Company
import companyIndex from './views/Pages/Company/companyIndex.vue'
import logo1 from './views/Pages/Company/logo1.vue'
import ygInfo from './views/Pages/Company/ygInfo.vue'
import zpLiuC from './views/Pages/Company/zpLiuC.vue'
Vue.use(Button);
Vue.use(VueRouter);
let router = new VueRouter({
    routes: [{
            path: '/',
            name: 'index',
            component: index,
            meta: {
                auth: false,
            },
        },
        {
            path: '/detail',
            name: 'detail',
            component: detail,
            meta: {
                auth: true,
                role: "user",
            },
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                auth: true,

            },
        },
        {
            path: '/detail/:id',
            name: 'detailId',
            component: detail,
            meta: {
                auth: true,
                role: "user",
            },
        },
        {
            path: '/404',
            name: 'f404',
            component: f404,
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                auth: true,
                role: "admin",
            },
            children: [{
                    path: 'userInfo',
                    name: 'userInfo',
                    component: userInfo,
                    meta: {
                        auth: true,
                        role: "admin",
                    },
                },

                {
                    path: 'success',
                    name: 'success',
                    component: success,
                    meta: {
                        auth: true,
                        role: "admin",
                    },
                },
                {
                    path: 'jobInfo',
                    name: 'jobInfo',
                    component: jobInfo,
                    meta: {
                        auth: true,
                        role: "admin",
                    },
                },
                {
                    path: 'jianLiInfo',
                    name: 'jianLiInfo',
                    component: jianLiInfo,
                    meta: {
                        auth: true,
                        role: "admin",
                    },
                },
                {
                    path: 'applicationInfo',
                    name: 'applicationInfo',
                    component: applicationInfo,
                    meta: {
                        auth: true,
                        role: "admin",
                    },
                },
                {
                    path: 'companyInfo',
                    name: 'companyInfo',
                    component: companyInfo,
                    meta: {
                        auth: true,
                        role: "admin",
                    },
                },
                {
                    path: 'skillInfo',
                    name: 'skillInfo',
                    component: skillInfo,
                    meta: {
                        auth: true,
                        role: "admin",

                    },
                },
                {
                    path: 'role',
                    name: 'role',
                    component: role,
                    meta: {
                        auth: true,
                        role: "admin",

                    },
                },
            ]


        },
        {
            path: '/userIndex',
            name: 'userIndex',
            component: userIndex,
            children: [{
                    path: 'logo',
                    name: 'logo',
                    component: logo,
                    meta: {
                        auth: true,
                        role: "user",

                    },
                },
                {
                    path: 'zpInfo',
                    name: 'zpInfo',
                    component: zpInfo,
                    meta: {
                        auth: true,
                        role: "user",

                    },
                },
                {
                    path: 'qyInfo',
                    name: 'qyInfo',
                    component: qyInfo,
                    meta: {
                        auth: true,
                        role: "user",


                    },
                },
                {
                    path: 'zpLiuChen',
                    name: 'zpLiuChen',
                    component: zpLiuChen,
                    meta: {
                        auth: true,
                        role: "user",


                    },
                },
                {
                    path: 'register',
                    name: 'register',
                    component: register,
                    meta: {
                        auth: true,
                        role: "user",


                    },
                }

            ]
        },
        {
            path: '/companyIndex',
            name: 'companyIndexIndex',
            component: companyIndex,
            children: [{
                    path: 'logo1',
                    name: 'logo1',
                    component: logo1,
                    meta: {
                        auth: true,
                        role: "company",


                    },
                },
                {
                    path: 'ygInfo',
                    name: 'ygInfo',
                    component: ygInfo,
                    meta: {
                        auth: true,
                        role: "company",

                    },
                },
                {
                    path: 'zpLiuC',
                    name: 'zpLiuC',
                    component: zpLiuC,
                    meta: {
                        auth: true,
                        role: "company",

                    },
                },
                {
                    path: 'register',
                    name: 'register',
                    component: register,
                    meta: {
                        auth: true,
                        role: "company",

                    },
                }
            ]

        },



    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.auth && to.meta.role === 'admin') {
        let token = sessionStorage.getItem('token');
        console.log(token);
        if (token) {
            next();
        } else {
            next({
                path: '/404'
            })
        }

    }
    if (to.meta.auth && to.meta.role === 'user') {
        let token = sessionStorage.getItem('token');
        console.log(token);
        if (token) {
            next();
        } else {
            next({
                path: '/404'
            })
        }

    }
    if (to.meta.auth && to.meta.role === 'company') {
        let token = sessionStorage.getItem('token');
        console.log(token);
        if (token) {
            next();
        } else {
            next({
                path: '/404'
            })
        }

    } else {
        next();
    }
    next()
})
export default router;