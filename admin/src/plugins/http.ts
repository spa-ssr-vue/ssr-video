import Vue from 'vue';
import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

// http.interceptors.request.use()
Reflect.set(window, 'axios', http)
// window.axios = http
// Vue.prototype.$httpajax = http
Vue.prototype.$http = http