import axios from 'axios'
import {log, saveToken} from '../utils'
import {Api} from './index'


class UserApi extends Api {
    auth() {
        // const url = this.baseUrl + '/auth'
        const url = '/auth'
        return this.axios({
            url: url,
            method: 'get',
            headers: {'z-token': this.token}
        })
    }

    register(data) {
        const url = this.baseUrl + '/register'
        return this.axios({
            url: url,
            method: 'post',
            data: data,
        })
    }

    login(data) {
        const url = this.baseUrl + '/login'
        return this.axios({
            url: url,
            method: 'post',
            data: data,
        })

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
        log('r', r)
        if (r.status === 200 && r.data.user !== null) {
            const token = r.data.token
            saveToken(token)
            return r.data.user
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
