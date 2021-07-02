import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/pages/Dashboard.vue'
import Home from '../views/pages/Home.vue'
import Deposit from '../views/pages/tabungan/Deposit.vue'
import Withdraw from '@/views/pages/tabungan/Withdraw.vue'
import Profile from '@/views/pages/auth/Profile.vue'
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
      requiredAdmin: false,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiredAuth: true,
      requiredAdmin: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      requiredAuth: true,
      requiredAdmin: false,
    },
  },
  {
    path: '/tabungan/deposit',
    name: 'Deposit',
    component: Deposit,
    meta: {
      title: 'Deposit',
      requiredAuth: true,
      requiredAdmin: true,
    },
  },
  {
    path: '/tabungan/withdraw',
    name: 'withdraw',
    component: Withdraw,
    meta: {
      title: 'Withdraw',
      requiredAdmin: true,
      requiredAuth: true,
    },
  },
  {
    path: '/tabungan/savings',
    name: 'savings',
    component: Savings,
    meta: {
      title: 'Tabungan',
      requiredAdmin: true,
      requiredAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      title: 'Profile',
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
    const { role } = JSON.parse(localStorage.getItem('user'))
    if (!token) {
      next({ name: 'login' })
    } else {
      if (to.meta.requiredAdmin) {
        if (role === 'admin') {
          next()
        } else {
          next({ name: 'unauthorized' })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
export default router
