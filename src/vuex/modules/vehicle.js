import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        vehicles: null,
        vehicle: null
    },
    getters: {
        vehicles(state) {
            return state.vehicles
        },
        vehicle(state) {
            return state.vehicle
        }
    },
    mutations: {
        setVehicles(state, vehicles) {
            state.vehicles = vehicles
        },
        setVehicle(state, vehicle) {
            state.vehicle = vehicle
        }
    },
    actions: {
        getVehicles({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/vehicle").then(res => {
                    if (res && res.data) {
                        commit('setVehicles', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        addVehicle({ commit }, vehicle) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!vehicle.licencePlate || !vehicle.rateCategory || !vehicle.carTracker || !vehicle.ownerCredentials)
                    reject()

                AxiosInstance.post("/vehicle", {
                    licencePlate: vehicle.licencePlate,
                    rateCategoryId: vehicle.rateCategory,
                    carTrackerId: vehicle.carTracker,
                    ownerCredentialsId: vehicle.ownerCredentials
                }).then(res => {
                    if (res && res.data) {
                        resolve(res)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        updateVehicle({ commit }, v) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!v)
                    reject()

                AxiosInstance.put("/vehicle", v).then(res => {
                    if (res && res.data) {
                        resolve(res)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        transferOwnershipVehicle({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!payload.vehicleId || !payload.ocId) {
                    reject()
                    return
                }

                AxiosInstance.put(`/vehicle/transferownership`, payload).then(res => {
                    if (res && res.data) {
                        resolve(res)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        }
    }
}