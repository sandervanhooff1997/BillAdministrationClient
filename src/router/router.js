import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/vuex/store'
import unauthenticatedRoutes from '@/router/unauthenticated-routes'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let user = store.getters.user
  let token = localStorage.token

  // NProgress.start()

  if (user) {
    if (unauthenticatedRoutes.indexOf(to.name) > -1) {
      next(false)
      // NProgress.done()
    } else {
      next()
    }
  } else {
    if (token) {
      // store.dispatch("setAutoLoggingIn", true);

      store
        .dispatch("autoLogin")
        .then(() => {
          if (unauthenticatedRoutes.indexOf(to.name) > -1) {
            next({
              name: 'bills'
            })
          } else {
            next()
          }
        })
        .catch(() => {
          next({
            name: 'login'
          })
        })
        .finally(() => {
          // store.dispatch("setAutoLoggingIn", false);
        });
    } else {
      if (unauthenticatedRoutes.indexOf(to.name) > -1) {
        next()
      } else {
        next('login');
        // NProgress.done();
      }
    }
  }
})

export default router
