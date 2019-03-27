import Vue from 'vue'
import Vuex from 'vuex'
import AxiosInstance from './axios-config'

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
  }
})
