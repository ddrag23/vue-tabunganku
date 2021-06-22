import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
createApp(App).use(router).mount('#app')
