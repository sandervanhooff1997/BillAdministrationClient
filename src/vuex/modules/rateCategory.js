import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        rateCategories: null
    },
    getters: {
        rateCategories(state) {
            return state.rateCategories
        }
    },
    mutations: {
        setRateCategories(state, rateCategories) {
            state.rateCategories = rateCategories
        }
    },
    actions: {
        getRateCategories({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/ratecategory").then(res => {
                    if (res && res.data) {
                        // res.data.forEach(x => x.date = x.date.replace("[UTC]", ""));
                        commit('setRateCategories', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    console.log(err)
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        addRateCategory({ commit }, rateCategory) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!rateCategory.name || !rateCategory.price)
                    reject()

                AxiosInstance.post("/ratecategory", rateCategory).then(res => {
                    console.log(res)
                    if (res && res.data) {
                        resolve(res)
                    }

                    reject()
                }).catch(err => {
                    console.log(err)
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },

    }
}