import AxiosInstance from '@/vuex/axios-config'

export default {
    state: {
        bills: null,
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
        }
    },
    actions: {
        getBills({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                AxiosInstance.get("/bill").then(res => {

                    if (res && res.data) {
                        res.data.forEach(x => x.createDate = x.createDate.replace("[UTC]", ""));
                        commit('setBills', res.data)
                        resolve(res.data)
                    }

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
        generateBills({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)

                var movements = [
                    {
                        "id": "1",
                        "serialNumber": "4",
                        "authorisationCode": "",
                        "carTracker": {
                            "id": "2",
                            "mileage": "90",
                            "hardware": "i7",
                            "isDeleted": "false"
                        }
                    },
                    {
                        "id": "2",
                        "serialNumber": "2",
                        "authorisationCode": "",
                        "carTracker": {
                            "id": "2",
                            "mileage": "100",
                            "hardware": "i7",
                            "isDeleted": "false"
                        }
                    },
                    {
                        "id": "3",
                        "serialNumber": "3",
                        "authorisationCode": "",
                        "carTracker": {
                            "id": "2",
                            "mileage": "110",
                            "hardware": "i7",
                            "isDeleted": "false"
                        }
                    }
                ];

                AxiosInstance.post("/bill/generate", movements).then(res => {
                    console.log(res)
                    resolve()
                }).catch(err => {
                    reject(err)
                }).finally(() => commit('setLoading', false))
            })
        }
    }
}