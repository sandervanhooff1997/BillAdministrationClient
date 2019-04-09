import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8081/callcenter/",
    timeout: 30 * 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default instance
