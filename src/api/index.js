import {message} from 'antd'
import axios from 'axios'


const saveToken = (token) => {
    window.localStorage.token = token
}

const clearToken = () => {
    window.localStorage.removeItem('token')
}

class Api {
    constructor() {
        // this.baseUrl = 'http://localhost:5000'
        this.baseUrl = 'http://45.77.155.210'
        this.token = this.getToken()
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        })

        this.init()
    }

    init() {
        this.axios.interceptors.request.use((config) => {
            config.headers['z-token'] = this.getToken()
            return config
        })

        this.axios.interceptors.response.use((res) => {
            console.log('interceptors', res.data)
            if (res.status === 200) {
                const {errcode} = res.data
                if (errcode === 0) {
                    return Promise.resolve(res.data)
                } else {
                    let check = new CheckErrorCode()
                    check.checkcode(res.data)
                    return
                }
            } else {
                const err = {
                    'title': 'oops, something wrong',
                    'status': res.status
                }
                throw err
            }
        }, error => {
            console.log('interceptors error', error)
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
            4001: 'user already exist'
        }
        this.jump = {
            2000: () => {
                this.redirectLogin()
            }
        }
    }

    checkcode(r) {
        console.log('r', r)
        const {errcode, redirect_url } = r
        const msg = this.messages[errcode]
        if (redirect_url !== undefined) {
            console.log('redirect url ', redirect_url)
            // window.location.href = redirect_url
        } else {
            console.log('redirect url', r)
            // this.jump[errcode]()
        }
        // msg(message)
        message.error(`${msg}`)
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
    clearToken,
    msg,
}