import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './routes';


const app = createApp(App);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');

