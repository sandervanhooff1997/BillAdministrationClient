import Vue from 'vue'
import Router from 'vue-router'
import Bills from '@/views/Bills'
import CarTrackers from '@/views/CarTrackers'
import RateCategories from '@/views/RateCategories'
import Vehicles from '@/views/Vehicles'
import OwnerCredentials from '@/views/OwnerCredentials'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'bills'
      }
    },
    {
      path: '/bills',
      name: 'bills',
      component: Bills
    },
    {
      path: '/car-trackers',
      name: 'cartrackers',
      component: CarTrackers
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: Vehicles
    },
    {
      path: '/rate-categories',
      name: 'ratecategories',
      component: RateCategories
    },
    {
      path: '/owner-credentials',
      name: 'ownercredentials',
      component: OwnerCredentials
    },
    {
      path: '*',
      redirect: {
        name: 'bills'
      }
    }
  ]
})
