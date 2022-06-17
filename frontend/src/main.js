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

const firebaseConfig = {
  apiKey: 'AIzaSyCTeWMiV4R17mqHC-2fNSu10-vm4ITfe8k',
  authDomain: 'miraclemorning-328be.firebaseapp.com',
  databaseURL: 'https://miraclemorning-328be-default-rtdb.firebaseio.com',
  projectId: 'miraclemorning-328be',
  storageBucket: 'miraclemorning-328be.appspot.com',
  messagingSenderId: '993767488143',
  appId: '1:993767488143:web:35a0fcc6a7f9e0673f8efa',
  measurementId: 'G-T8RF2RR71K'
}

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
