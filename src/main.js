import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './registerServiceWorker'
import moment from 'moment'

// custom vue components
import Loader from '@/components/Loader'
Vue.component('loader', Loader)

import Messages from '@/components/Messages'
Vue.component('messages', Messages)

import Bill from '@/components/Bill/Bill'
Vue.component('bill', Bill)

import Vehicle from '@/components/Vehicle/Vehicle'
Vue.component('vehicle', Vehicle)

import AddVehicle from '@/components/Vehicle/AddVehicle'
Vue.component('add-vehicle', AddVehicle)

import RateCategory from '@/components/RateCategory/RateCategory'
Vue.component('rate-category', RateCategory)

import AddRateCategory from '@/components/RateCategory/AddRateCategory'
Vue.component('add-rate-category', AddRateCategory)

import OwnerCredential from '@/components/OwnerCredential/OwnerCredential'
Vue.component('owner-credential', OwnerCredential)

import CarTracker from '@/components/CarTracker/CarTracker'
Vue.component('car-tracker', CarTracker)

import AddCarTracker from '@/components/CarTracker/AddCarTracker'
Vue.component('add-car-tracker', AddCarTracker)

// filters
Vue.filter('date', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm:ss') + "u"
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
