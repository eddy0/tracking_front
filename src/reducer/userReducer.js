import createReducer from './helper'
import {LOGIN_USER} from '../actions/userAction'


const loginReducer = (state, action) => {
    return action.user
}


export default createReducer(null, {
    [LOGIN_USER]: loginReducer,
})