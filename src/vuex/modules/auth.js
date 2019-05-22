import AxiosInstance from '@/vuex/axios-config'
import jwtDecode from 'jwt-decode'

export default {
    state: {
        user: null
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, user) {
            if (user && user.roles) {
                user.roles = user.roles.split(",")
            }

            state.user = user
        }
    },
    actions: {
        setAuthorisationHeader({ }, token) {
            if (token)
                AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            else
                delete AxiosInstance.defaults.headers.common['Authorization']
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                if (!payload.email || !payload.password)
                    reject(false)

                context.dispatch('setLoading', true)

                AxiosInstance.post('authentication/login', payload)
                    .then(res => {
                        let token = res.data

                        // if no token, client needs to see code confirmation screen
                        if (!token)
                            reject()

                        // else set user from obtained token and skip confirmation screen
                        let success = context.dispatch("setUser", token)

                        if (!success)
                            reject()

                        resolve()
                    })
                    .catch(() => reject())
                    .finally(() => context.dispatch('setLoading', false))
            })
        },

        setUser(context, token) {
            if (!token)
                return false

            try {
                let user = jwtDecode(token)

                if (!user.id || !user.email || typeof undefined == user.roles || user.roles == null)
                    return false

                localStorage.token = token

                // setup auth header
                context.dispatch("setAuthorisationHeader", token)

                // set vuex state
                context.commit("setUser", {
                    id: user.id,
                    email: user.email,
                    roles: user.roles
                })

                return true
            } catch (err) {
                console.log("Decode JWT error", err)
                localStorage.token = null
                context.dispatch("setAuthorisationHeader", null)
                return false
            }
        },
        autoLogin(context) {
            // token found but no user fetched
            if (localStorage.token && !context.getters.user) {
                let token = localStorage.token
                let success = context.dispatch("setUser", token)
                return success
            } else {
                return false
            }
        },
        logout(context) {
            delete localStorage.token
            context.dispatch("setAuthorisationHeader", null)
            context.commit("setUser", null)
        }
    }
}