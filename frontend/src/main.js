import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebaseConfig from './plugins/firebaseConfig'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import VueGeolocation from 'vue-geolocation-api'

import './styles/index.scss'
import colors from './styles/_color.scss'
Vue.prototype.$colors = colors

Vue.config.productionTip = false

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

Vue.prototype.$database = database

Vue.use(VueGeolocation)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
