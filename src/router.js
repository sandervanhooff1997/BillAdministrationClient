import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'map'
      }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/Map.vue')
    },
  ]
})
