import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        ownerCredentials: null,
        ownerCredential: null
    },
    getters: {
        ownerCredentials(state) {
            return state.ownerCredentials
        },
        ownerCredential(state) {
            return state.ownerCredential
        }
    },
    mutations: {
        setOwnerCredentials(state, ownerCredentials) {
            state.ownerCredentials = ownerCredentials
        },
        setOwnerCredential(state, ownerCredential) {
            state.ownerCredential = ownerCredential
        }
    },
    actions: {
        getOwnerCredentials({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/ownercredentials").then(res => {
                    if (res && res.data) {
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
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        getOwnerCredentialsUnusedByVehicleId({ commit }, vehicleId) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/ownercredentials/unused/" + vehicleId).then(res => {
                    if (res && res.data) {
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
                    !ownerCredentials.bsn ||
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