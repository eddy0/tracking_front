import { combineReducers } from 'redux'
import todoReducer from "./todoReducer";
import awbReducer from './awbReducer'
import userReducer from './userReducer'
import loadingReducer from './loadingReducer'


const reducer = combineReducers({
    todos: todoReducer,
    awbs: awbReducer,
    user: userReducer,
    loading: loadingReducer,
})

export default reducer
