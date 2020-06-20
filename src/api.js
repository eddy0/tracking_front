import Axios from "axios";
import {configure} from "axios-hooks";

const axios = Axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'http://192.168.0.22:3000',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.cookie
        // 'csrf_token'
    }
})

configure({ axios})

class UserApi {

    static login(data) {
        const path = '/api/login'
        return axios.post(path, data)
    }

    static register(data) {
        const path = '/api/register'
        return axios.post(path, data)
    }
}

class TopicApi {

    static new(data) {
        const path = '/api/topic'
        return axios.post(path, data)
    }

    static all() {
        const path = '/api/topic'
        return axios.get(path)
    }

    static fetch(id) {
        const path = `/api/topic/${id}`
        return axios.get(path)
    }
}



export default UserApi

export {
    TopicApi,
}