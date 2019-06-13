import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import './registerServiceWorker'
import moment from 'moment'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)

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

import OwnerCredential from '@/components/OwnerCredential/OwnerCredential'
Vue.component('owner-credential', OwnerCredential)

import AddOwnerCredential from '@/components/OwnerCredential/AddOwnerCredential'
Vue.component('add-owner-credential', AddOwnerCredential)

import Roads from '@/components/Taxes/Road/Roads'
Vue.component('roads', Roads)

import Road from '@/components/Taxes/Road/Road'
Vue.component('road', Road)

import AddRoad from '@/components/Taxes/Road/AddRoad'
Vue.component('add-road', AddRoad)

import Prices from '@/components/Taxes/Price/Prices'
Vue.component('prices', Prices)

import Price from '@/components/Taxes/Price/Price'
Vue.component('price', Price)

import DefaultPrice from '@/components/Taxes/Price/DefaultPrice'
Vue.component('default-price', DefaultPrice)

import AddPrice from '@/components/Taxes/Price/AddPrice'
Vue.component('add-price', AddPrice)

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

Vue.prototype.$userHasRole = (role) => {
  let user = store.getters.user
  if (!user || !role) return false;

  return user.roles.indexOf(role) > -1
}

Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
