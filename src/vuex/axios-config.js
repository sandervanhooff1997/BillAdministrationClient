import axios from 'axios'

const instance = axios.create({
    baseURL: isLocalhost() ? "http://localhost:8081/BillAdministration/" : "http://192.168.25.101:8080/BillAdministration/",
    timeout: 30 * 1000,
    headers: { 'Content-Type': 'application/json' }
});

function isLocalhost() {
    return location.hostname === "localhost" || location.hostname === "127.0.0.1"
}

export default instance
