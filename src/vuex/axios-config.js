import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8081/BillAdministration/",
    // baseURL: "http://192.168.25.101:8080/BillAdministration/",
    timeout: 30 * 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default instance
