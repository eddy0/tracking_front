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
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'z-token': this.getToken(),
            }
        })

        this.init()
    }

    init() {
        this.axios.interceptors.response.use((res) => {
            console.log('interceptors', res)
            if (res.status === 200) {
                const {errcode} = res.data
                if (errcode === 0) {
                    return Promise.resolve(res.data)
                } else {
                    let check = new CheckErrorCode()
                    // return check.checkcode(res.data)
                }
                return res.data
            } else {
                const err = {
                    'title': 'oops, something wrong',
                    'status': res.status
                }
                throw err
            }
        }, error => {
            console.log('error', error)
            // return Promise.reject(error)
        })
    }

    getToken() {
        let token = window.localStorage.token
        if (token === null) {
            token = ''
        }
        return token
    }

}


class CheckErrorCode {
    constructor() {
        this.messages = {
            2000: 'auth not valid',
        }
        this.jump = {
            2000: () => {
                this.redirectLogin()
            }
        }
    }

    checkcode(r) {
        const {errcode, redirect_url } = r
        const message = this.messages[errcode]
        if (redirect_url !== undefined) {
            window.location.href = redirect_url
        } else {
            this.jump[errcode]()
        }
        // msg(message)
        message.success(`This is a success message, ${message}`)
    }

    redirectLogin() {
        window.location.href = '/login'
    }
}


const msg = (message='') => {
    return message.success(`This is a success message, ${message}`)
}


export {
    Api,
    saveToken,
    msg,
}