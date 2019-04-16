import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        carTrackers: null
    },
    getters: {
        carTrackers(state) {
            return state.carTrackers
        }
    },
    mutations: {
        setCarTrackers(state, carTrackers) {
            state.carTrackers = carTrackers
        }
    },
    actions: {
        getCarTrackers({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/cartracker").then(res => {
                    if (res && res.data) {
                        // res.data.forEach(x => x.date = x.date.replace("[UTC]", ""));
                        commit('setCarTrackers', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        getCarTrackersUnused({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/cartracker/unused").then(res => {
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
        addCarTracker({ commit }, carTracker) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!carTracker.hardware)
                    reject()

                AxiosInstance.post("/cartracker", {
                    hardware: carTracker.hardware
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

    }
}