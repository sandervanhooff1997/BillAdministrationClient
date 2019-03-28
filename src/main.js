import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './registerServiceWorker'
import Loader from '@/components/Loader'
import Bill from '@/components/Bill'
import Vehicle from '@/components/Vehicle'
import RateCategory from '@/components/RateCategory'
import OwnerCredentials from '@/components/OwnerCredentials'
import CarTracker from '@/components/CarTracker'
import moment from 'moment'

Vue.filter('date', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm:ss') + "u"
  }
})

Vue.component('loader', Loader)
Vue.component('bill', Bill)
Vue.component('vehicle', Vehicle)
Vue.component('owner-credentials', OwnerCredentials)
Vue.component('rate-category', RateCategory)
Vue.component('car-tracker', CarTracker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
