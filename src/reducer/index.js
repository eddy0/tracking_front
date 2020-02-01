import { combineReducers } from 'redux'
import todoReducer from "./todoReducer";
import awbReducer from './awbReducer'


const reducer = combineReducers({
    todos: todoReducer,
    awbs: awbReducer,
})

export default reducer
