import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ingredientes from '../views/Ingredientes.vue'
import Lanches from '../views/Lanches.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/ingredientes',
        name: 'Ingredientes',
        component: Ingredientes
    },
    {
        path: '/lanches',
        name: 'Lanches',
        component: Lanches
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router