import Axios from "axios";
import {configure} from "axios-hooks";

const axios = Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
})

configure({ axios})

class UserApi {

    static login(data) {
        const path = '/api/login'
        return axios.post(path, data)
    }
}

export default UserApi