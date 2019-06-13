import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        roads: null,
        road: null,
        prices: null,
        price: null
    },
    getters: {
        roads(state) {
            return state.roads
        },
        road(state) {
            return state.road
        },
        prices(state) {
            return state.prices
        },
        price(state) {
            return state.price
        }
    },
    mutations: {
        setRoads(state, roads) {
            state.roads = roads
        },
        setRoad(state, road) {
            state.road = road
        },
        setPrices(state, prices) {
            state.prices = prices
        },
        setPrice(state, price) {
            state.price = price
        },
    },
    actions: {
        getRoads({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/road").then(res => {
                    if (res && res.data) {
                        commit('setRoads', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        async addRoad({ commit, dispatch }, road) {
            commit('setLoading', true)

            if (!road.name || !road.price || !road.rushHourPrice)
                return 'Invalid data';

            try {
                let price = await dispatch('addPrice', { price: road.price })
                let rushHourPrice = await dispatch('addPrice', { price: road.rushHourPrice })

                let payload = {
                    name: road.name,
                    priceId: price.id,
                    rushHourPriceId: rushHourPrice.id
                }

                let res = await AxiosInstance.post("/road", payload)
                commit('setLoading', false)
                return res.data
            } catch (e) {
                return 'Error creating road'
            }
        },
        getPrices({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/price").then(res => {
                    if (res && res.data) {
                        commit('setPrices', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        getPricesUnused({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/price/unused").then(res => {
                    if (res && res.data) {
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        async addPrice({ commit }, price) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!price.price)
                    reject()

                AxiosInstance.post("/price", {
                    price: price.price
                }).then(res => {
                    if (res && res.data) {
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        async addPriceToRoad({ commit, getters, dispatch }, newPrice) {
            commit('setLoading', true)

            if (!newPrice || !getters.road)
                return;

            try {
                let price = await dispatch('addPrice', { price: newPrice })

                let payload = {
                    roadId: getters.road.id,
                    priceId: price.id
                }

                await AxiosInstance.put("/road/addprice", payload)

                commit('setLoading', false)
                return price
            } catch (e) {
                return 'Error creating road'
            }
        },

        async addRushHourPriceToRoad({ commit, getters, dispatch }, newPrice) {
            commit('setLoading', true)

            if (!newPrice || !getters.road)
                return;

            try {
                let price = await dispatch('addPrice', { price: newPrice })

                let payload = {
                    roadId: getters.road.id,
                    priceId: price.id
                }

                await AxiosInstance.put("/road/addrushprice", payload)

                commit('setLoading', false)
                return price
            } catch (e) {
                return 'Error creating road'
            }
        },

        async createOrUpdateDefaultPrice(context, payload) {
            try {
                if (!payload.price) throw 'Invalid data: price not set'

                let res = await AxiosInstance.post('/price/default', payload);
                return res.data;
            } catch (e) {
                console.log(e);
                context.dispatch("errorMessage", "Error updating default price");
                throw e;
            }
        },

        async getDefaultPrice(context) {
            try {
                let res = await AxiosInstance.get('/price/default');
                return res.data;
            } catch (e) {
                console.log(e);
                context.dispatch("errorMessage", "Error getting default price");
                return null;
            }
        },

        async getDefaultRushPrice(context) {
            try {
                let res = await AxiosInstance.get('/price/defaultrush');
                return res.data;
            } catch (e) {
                console.log(e);
                context.dispatch("errorMessage", "Error getting default rush price");
                return null;
            }
        }
    }
}