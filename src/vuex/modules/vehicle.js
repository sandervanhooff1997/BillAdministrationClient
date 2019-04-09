import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        vehicles: null
    },
    getters: {
        vehicles(state) {
            return state.vehicles
        }
    },
    mutations: {
        setVehicles(state, vehicles) {
            state.vehicles = vehicles
        }
    },
    actions: {
        getVehicles({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/vehicle").then(res => {
                    console.log(res)
                    if (res && res.data) {
                        // res.data.forEach(x => x.date = x.date.replace("[UTC]", ""));
                        commit('setVehicles', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    console.log(err)
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        }

    }
}