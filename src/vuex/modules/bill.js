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
        async recalculateBill(context, bill) {
            try {
                if (!bill) throw 'Invalid data';
                console.log(bill)
                context.commit('setLoading', true)

                let carTrackerIds = bill.carTrackers.map(x => `id=${x.id}&`);

                let movementsRes = await AxiosMovementInstance.get(`movement/month/${bill.monthIndex}/cartracker?${carTrackerIds}`)

                if (!movementsRes.data || !Array.isArray(movementsRes.data))
                    throw 'Invalid data'

                let billRes = await AxiosInstance.post("/bill/recalculate", {
                    billId: bill.id,
                    movements: movementsRes.data
                })

                return billRes.data;
            } catch (e) {
                console.log(e)
                context.dispatch('errorMessage', 'Error recalculating bill')
            } finally {
                context.commit('setLoading', false)
            }

            // if (!id)
            //     reject();

            // AxiosInstance.get(`/bill/${id}/recalculate`).then(res => {

            //     if (res && res.data) {
            //         resolve(res.data)
            //     }

            //     reject()
            // }).catch(err => {

            //     reject(err)
            // }).finally(() => commit('setLoading', false))

            // })
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