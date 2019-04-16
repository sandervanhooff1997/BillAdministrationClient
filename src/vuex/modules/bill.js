import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        bills: null
    },
    getters: {
        bills(state) {
            return state.bills
        }
    },
    mutations: {
        setBills(state, bills) {
            state.bills = bills
        }
    },
    actions: {
        getBills({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/bill").then(res => {
                    (res)
                    if (res && res.data) {
                        res.data.forEach(x => x.date = x.date.replace("[UTC]", ""));
                        commit('setBills', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    (err)
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        }

    }
}