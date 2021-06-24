import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { store } from './stores'
import axios from 'axios'
// import 'es6-promise/auto'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
createApp(App).use(router).use(store).mount('#app')
