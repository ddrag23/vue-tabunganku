import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/pages/Home.vue'
import Deposit from '../views/pages/tabungan/Deposit.vue'
import Withdraw from '@/views/pages/tabungan/Withdraw.vue'
import Savings from '../views/pages/tabungan/Savings.vue'
import PageNotFound from '../views/errors/NotFound.vue'
import Login from '../views/pages/auth/Login.vue'
import Unauthorized from '../views/errors/Unauthorized.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
      requiredAuth: false,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiredAuth: true,
    },
  },
  {
    path: '/tabungan/deposit',
    name: 'Deposit',
    component: Deposit,
    meta: {
      title: 'Deposit',
      requiredAuth: true,
    },
  },
  {
    path: '/tabungan/withdraw',
    name: 'withdraw',
    component: Withdraw,
    meta: {
      title: 'Withdraw',
      requiredAuth: true,
    },
  },
  {
    path: '/tabungan/savings',
    name: 'savings',
    component: Savings,
    meta: {
      title: 'Tabungan',
      requiredAuth: true,
    },
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized,
    meta: {
      title: '403 bos',
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
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
