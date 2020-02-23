import axios from 'axios'
import {log, saveToken} from '../utils'
import {Api} from './index'


class UserApi extends Api {
    auth() {
        // const url = this.baseUrl + '/auth'
        const url = '/auth'
        return this.axios.get(url)
    }

    register(data) {
        const url = '/register'
        return this.axios.post(url, data)
    }

    login(data) {
        const url = '/login'
        return this.axios.post(url, data)
    }
}


const register = (form) => {
    return new UserApi().register(form)
}

const login = (form) => {
    return new UserApi().login(form).then(r => {
        const {errcode, user} = r
        if (errcode === 0 && user !== null) {
            const token = r.token
            saveToken(token)
            return user
        } else {
            return null
        }
    })
}

const getAuth = () => {
    return new UserApi().auth().then((r) => {
        const {errcode, user, token} = r
        if (errcode === 0 && user !== null) {
            saveToken(token)
            return user
        } else {
            return null
        }
    })
}

export {
    register,
    login,
    getAuth,
}
