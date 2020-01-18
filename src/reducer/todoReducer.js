import createReducer from "./helper";
import {CREATE_TODO, DELETE_TODO, FETCH_TODO, UPDATE_TODO} from "../actions/todoAction";


const fetchTodoReducer = (state, action) => {
    return [...action.todos]
}

const createTodoReducer = (state, action) => {
    return [...state, action.event]
}

const deleteTodoReducer = (state, action) => {
    return state.filter((e) => e.id !== action.id)
}

const updateTodoReducer = (state, action) => {
    return state.map((event) => {
        if (event.id === action.event.id) {
            return action.event
        } else {
            return event
        }
    })
}

export default createReducer([], {
    [FETCH_TODO]: fetchTodoReducer,
    [CREATE_TODO]: createTodoReducer,
    [DELETE_TODO]: deleteTodoReducer,
    [UPDATE_TODO]: updateTodoReducer,
})