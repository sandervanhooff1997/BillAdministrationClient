export default {
  state: {
    messages: []
  },

  getters: {
    messages(state) {
      return state.messages
    }
  },

  mutations: {
    addMessage(state, message) {
      state.messages.push(message)
    },
    removeMessage(state, message) {
      state.messages.splice(state.messages.indexOf(message), 1)
    },
    clearMessages(state) {
      state.messages = []
    }
  },
  actions: {
    errorMessage({ commit }, text) {
      commit('addMessage', {
        color: 'error',
        on: true,
        text
      })
    },
    successMessage({ commit }, text) {
      commit('addMessage', {
        color: 'success',
        on: true,
        text
      })
    },
    infoMessage({ commit }, text) {
      commit('addMessage', {
        color: 'info',
        on: true,
        text
      })
    },
    removeMessage({ commit }, message) {
      commit('removeMessage', message)
    },
    clearMessages({ commit }) {
      commit('clearMessages')
    }
  }
}
