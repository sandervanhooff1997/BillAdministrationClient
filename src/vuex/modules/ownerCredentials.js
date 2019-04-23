import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        ownerCredentials: null
    },
    getters: {
        ownerCredentials(state) {
            return state.ownerCredentials
        }
    },
    mutations: {
        setOwnerCredentials(state, ownerCredentials) {
            state.ownerCredentials = ownerCredentials
        }
    },
    actions: {
        getOwnerCredentials({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/ownercredentials").then(res => {
                    if (res && res.data) {
                        // res.data.forEach(x => x.date = x.date.replace("[UTC]", ""));
                        commit('setOwnerCredentials', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        getOwnerCredentialsUnused({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/ownercredentials/unused").then(res => {
                    if (res && res.data) {
                        // res.data.forEach(x => x.date = x.date.replace("[UTC]", ""));
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        addOwnerCredentials({ commit }, ownerCredentials) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!ownerCredentials.name ||
                    !ownerCredentials.city ||
                    !ownerCredentials.streetName ||
                    !ownerCredentials.houseNumber)
                    reject()

                AxiosInstance.post("/ownercredentials", ownerCredentials).then(res => {
                    if (res && res.data) {
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },

    }
}