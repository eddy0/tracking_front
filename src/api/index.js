import {message} from 'antd'
import axios from 'axios'


const saveToken = (token) => {
    window.localStorage.token = token
}


axios.defaults.headers['Content-Type'] = 'application/json'


class Api {
    constructor() {
        this.baseUrl = 'http://localhost:5000'
        // this.baseUrl = 'http://45.77.155.210'
        this.token = this.getToken()
    }

    getToken() {
        let token = window.localStorage.token
        if (token === null) {
            token = ''
        }
        return token
    }

}


const msg = () => {
    return message.success('This is a success message')
}


export {
    Api,
    saveToken,
    msg,
}