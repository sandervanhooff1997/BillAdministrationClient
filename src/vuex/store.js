import Vue from 'vue'
import Vuex from 'vuex'

import BillModule from './modules/bill'
import VehicleModule from './modules/vehicle'
import CarTrackerModule from './modules/cartracker'
import RateCategoryModule from './modules/rateCategory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  getters: {
    loading(state) {
      return state.loading
    }
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    setLoading({ commit }, loading) {
      commit('setLoading', loading)
    }

  },
  modules: {
    BillModule,
    VehicleModule,
    CarTrackerModule,
    RateCategoryModule
  }
})
