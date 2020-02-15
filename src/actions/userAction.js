import {actionLoadingEnd, actionLoadingStart} from './loadingAction'
import {message} from 'antd'
import {getAuth, login, register} from '../api/user'


const LOGIN_USER = 'LOGIN_USER'
const REGISTER_USER = 'REGISTER_USER'

const actionUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

const handleAuth = () => dispatch => {
    const token = window.localStorage.token
    if (token !== undefined) {
        dispatch(actionLoadingStart())
        getAuth().then(user => {
            console.log(user)
            dispatch(actionUser(user))
            dispatch(actionLoadingEnd())
        }).catch((err) => {
            console.log('err', err)
            window.location.href = '/login'
        })
    } else {
        window.location.href = '/login'
    }
}

const handleLogin = (form, cb) => dispatch => {
    return login(form).then(user => {
        console.log(user)
        dispatch(actionUser(user))
        cb()
    })
}


const handleRegister = (form) => dispatch => {
    dispatch(actionLoadingStart())
    return register(form).then(r => {
        console.log(r)
        if (r.status === 200 && r.data.user !== null) {
            dispatch(actionUser(r.data.user))
            dispatch(actionLoadingEnd())
        } else {
            message.error('register error')
            dispatch(actionLoadingEnd())
        }
    })
}

export {
    LOGIN_USER,
    REGISTER_USER,
    handleRegister,
    handleLogin,
    handleAuth,
}