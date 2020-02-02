import { combineReducers } from 'redux'
import todoReducer from "./todoReducer";
import awbReducer from './awbReducer'
import userReducer from './userReducer'


const reducer = combineReducers({
    todos: todoReducer,
    awbs: awbReducer,
    user: userReducer,
})

export default reducer
