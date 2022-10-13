import { createRouter, createWebHistory } from 'vue-router'
import util from '../util/index.js'
import administrator from "./modules/administrator/index.js";
import epidemicPersonnel from "./modules/epidemicPersonnel/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/account/LoginPage.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/main/MainPage.vue'),
      children: [...administrator, ...epidemicPersonnel]
    }
  ]
})
  router.beforeEach((to, from, next) => {
    if ( to.path === '/' || to.path === '/login') {
      next()
    }
    const token = util.cookies.get(`token`)
    if(!token) {
      next('/login')
    }
    next()
  })
export default router
