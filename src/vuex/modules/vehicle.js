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

                if (!vehicle.licencePlate || !vehicle.vehicleType || !vehicle.carTracker || !vehicle.ownerCredentials)
                    reject()

                AxiosInstance.post("/vehicle", {
                    licencePlate: vehicle.licencePlate,
                    vehicleType: vehicle.vehicleType,
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
        },
        changeCarTracker({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!payload.vehicleId || !payload.ctId) {
                    reject()
                    return
                }
                console.log(payload)
                AxiosInstance.put(`/vehicle/changecartracker`, payload).then(res => {
                    if (res && res.data) {
                        resolve(res)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        async getOwnershipHistory({ commit }, licencePlate) {
            if (!licencePlate) throw "No licenseplate specified";

            try {
                commit('setLoading', true);
                let res = await AxiosInstance.get("/ownershiphistory/" + licencePlate);
                return res.data;
            } catch (e) {
                throw e;
            } finally {
                commit('setLoading', false);
            }

        }
    }
}