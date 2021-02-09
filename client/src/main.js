import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './vuetify'
import axios from 'axios'

const API_URI = 'http://localhost:8081/api'

Vue.config.productionTip = false

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: API_URI
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
