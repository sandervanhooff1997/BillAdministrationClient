import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        rateCategories: null,
        rateCategory: null
    },
    getters: {
        rateCategories(state) {
            return state.rateCategories
        },
        rateCategory(state) {
            return state.rateCategory
        }
    },
    mutations: {
        setRateCategories(state, rateCategories) {
            state.rateCategories = rateCategories
        },
        setRateCategory(state, rateCategory) {
            state.rateCategory = rateCategory
        }
    },
    actions: {
        getRateCategories({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/ratecategory").then(res => {
                    if (res && res.data) {
                        commit('setRateCategories', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
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
                    if (res && res.data) {
                        resolve(res)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        editRateCategory({ commit }, rateCategory) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!rateCategory.name || !rateCategory.price)
                    reject()

                AxiosInstance.put("/ratecategory", rateCategory).then(res => {
                    if (res && res.data) {
                        commit('setRateCategory', rateCategory)
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