import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        carTrackers: null,
        carTracker: null
    },
    getters: {
        carTrackers(state) {
            return state.carTrackers
        },
        carTracker(state) {
            return state.carTracker
        }
    },
    mutations: {
        setCarTrackers(state, carTrackers) {
            state.carTrackers = carTrackers
        },
        setCarTracker(state, carTracker) {
            state.carTracker = carTracker
        },
    },
    actions: {
        getCarTrackers({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/cartracker").then(res => {
                    if (res && res.data) {
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