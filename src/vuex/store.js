import Vue from 'vue'
import Vuex from 'vuex'

import MessageModule from './modules/message'
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
    MessageModule,
    BillModule,
    VehicleModule,
    CarTrackerModule,
    RateCategoryModule
  }
})
