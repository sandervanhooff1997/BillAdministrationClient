import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './registerServiceWorker'
import Loader from '@/components/Loader'
import VehicleData from '@/components/VehicleData'
import SearchMovements from '@/components/SearchMovements'
import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm:ss')
  }
})

Vue.component('loader', Loader)
Vue.component('search-movements', SearchMovements)
Vue.component('vehicle-data', VehicleData)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
