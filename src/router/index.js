import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/pages/Home.vue'
import Deposit from '../views/pages/tabungan/Deposit.vue'
import PageNotFound from '../views/errors/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/deposit',
    name: 'Deposit',
    component: Deposit,
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
