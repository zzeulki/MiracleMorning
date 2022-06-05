import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from './router-account'
import Record from './router-record'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Miracle Morning',
      isVisibleHeader: true,
      isVisibleBackBtn: false,
      isVisibleBottomNavigation: true
    }
  },
  // account
  Account.SignUpRoute,
  Account.initSetRoute,
  // record
  Record.RecordDetailRoute,
  Record.RecordSummaryRoute
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
