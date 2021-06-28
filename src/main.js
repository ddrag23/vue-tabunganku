import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { store } from './stores'
import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.css'
// import 'es6-promise/auto'
const token = localStorage.getItem('token')
const bearerToken = `Bearer ${token}`
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common['Authorization'] = token ? bearerToken : ''

createApp(App).use(router).use(store).mount('#app')
