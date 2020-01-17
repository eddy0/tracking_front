import createReducer from "./helper";

const FETCH_TODO = 'FETCH_TODO'
const CREATE_EVENT = 'CREATE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'

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
    [CREATE_EVENT]: createTodoReducer,
    [DELETE_EVENT]: deleteTodoReducer,
    [UPDATE_EVENT]: updateTodoReducer,
})