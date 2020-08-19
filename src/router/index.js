import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Controller from "../components/Dashboard";

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Login,
        // beforeEnter(to, from, next) {
        //     if (localStorage.getItem('user')) {
        //         next('/dashboard')
        //     }
        //     next()
        // }
    },
    {
        name: 'controller',
        path: '/dashboard',
        component: Controller,
        meta: {requiresAuth: true}
    },
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/')
    }
    next()
})

export default router
