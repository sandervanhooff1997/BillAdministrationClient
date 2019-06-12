import AxiosInstance from '@/vuex/axios-config'
import AxiosMovementInstance from '@/vuex/axios-config-movement'

export default {
    state: {
        bills: null,
        bill: null,
        months: [
            "January",
            "Februari",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        paymentStatusses: ["OPEN", "PAYED", "CANCELLED"]
    },
    getters: {
        bills(state) {
            return state.bills
        },
        bill(state) {
            return state.bill
        },
        months(state) {
            return state.months
        },
        paymentStatusses(state) {
            return state.paymentStatusses
        }
    },
    mutations: {
        setBills(state, bills) {
            state.bills = bills
        },
        setBill(state, bill) {
            state.bill = bill
        }
    },
    actions: {
        async generateBills({ commit, dispatch }, monthIndex) {
            if (!monthIndex) return;

            try {
                commit('setLoading', true)
                let res = await AxiosMovementInstance.get('movement/month/' + monthIndex);
                if (!res.data) throw Exception('No movements found')
                let movements = res.data;
                console.log(movements.map(x => x.address))

                await AxiosInstance.post("/bill/generate", movements)
                await dispatch('getBills')
                return;
            } catch (e) {
                console.log(e)
                return e;
            } finally {
                commit('setLoading', false)
            }
        },
        getBills({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/bill").then(res => {

                    if (res && res.data) {
                        commit('setBills', res.data)
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {

                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        recalculateBill({ commit }, id) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                if (!id)
                    reject();

                AxiosInstance.get(`/bill/${id}/recalculate`).then(res => {

                    if (res && res.data) {
                        resolve(res.data)
                    }

                    reject()
                }).catch(err => {

                    reject(err)
                }).finally(() => commit('setLoading', false))

            })
        },
        getBillsByVehicleId({ commit }, vehicleId) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/bill/vehicle/" + vehicleId).then(res => {
                    if (res && res.data)
                        resolve(res.data)

                    reject()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))
            })
        },
        updatePaymentStatus({ commit }, bill) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                // validate
                if (!bill || !bill.id || !bill.paymentStatus)
                    reject()

                AxiosInstance.put("/bill", bill)
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
                    .finally(() => commit('setLoading', false))
            });
        },
    }
}