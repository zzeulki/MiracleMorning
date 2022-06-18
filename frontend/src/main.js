import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'


import './styles/index.scss'
import './styles/common.scss'

Vue.config.productionTip = false

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

Vue.prototype.$database = database

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
