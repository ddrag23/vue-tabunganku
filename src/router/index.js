import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/pages/Home.vue'
import Deposit from '../views/pages/tabungan/Deposit.vue'
import PageNotFound from '../views/errors/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/tabungan/deposit',
    name: 'Deposit',
    component: Deposit,
    meta: {
      title: 'Deposit',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
    meta: {
      title: '404 Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})
export default router
