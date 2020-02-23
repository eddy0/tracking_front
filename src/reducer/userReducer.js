import createReducer from './helper'
import {LOGIN_USER, LOGOUT_USER} from '../actions/userAction'


const loginReducer = (state, action) => {
    return action.user
}

const logoutReducer = (state, action) => {
    return action.user
}

const lgReducer = (state, action) => {
    return action.user
}

export default createReducer(null, {
    [LOGIN_USER]: loginReducer,
    [LOGOUT_USER]: logoutReducer,
})