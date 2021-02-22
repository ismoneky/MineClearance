import axios from 'axios'

const server = axios.create({
    baseURL: '',
    timeout: 1000
})

server.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
    }
    return config
})

server.interceptors.response.use(res => {
    return res
})

export default server