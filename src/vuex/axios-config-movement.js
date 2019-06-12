import axios from 'axios'

const instance = axios.create({
    baseURL: "http://192.168.25.102:8080/MovementRegistration/",
    timeout: 30 * 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default instance
