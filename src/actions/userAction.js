import {getAuth, log, login, register, saveToken} from '../utils'


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
        getAuth().then(user => {
            console.log(user)
            dispatch(actionUser(user))
        })
    } else {
        dispatch(actionUser(null))
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
    return register(form).then(r => {
        console.log(r)
        if (r.status === 200 && r.data.user !== null) {
            dispatch(actionUser(r.data.user))
        } else {

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