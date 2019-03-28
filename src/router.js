import Vue from 'vue'
import Router from 'vue-router'
import Bills from '@/views/Bills'
import CarTrackers from '@/views/CarTrackers'
import Vehicles from '@/views/Vehicles'

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
      path: '/cartrackers',
      name: 'cartrackers',
      component: CarTrackers
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: Vehicles
    },
    {
      path: '*',
      redirect: {
        name: 'bills'
      }
    }
  ]
})
