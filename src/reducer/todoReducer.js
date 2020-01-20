import createReducer from './helper'
import {
    CREATE_TODO,
    DELETE_TODO,
    FETCH_TODO,
    SAVE_TODO,
    TOGGLE_TODO,
    UPDATE_COMMENT,
    UPDATE_TODO
} from '../actions/todoAction'


const fetchTodoReducer = (state, action) => {
    return [...action.todos]
}


const createTodoReducer = (state, action) => {
    return [...state, action.todo]
}


const deleteTodoReducer = (state, action) => {
    return state.filter((e) => e.id !== action.id)
}


const toggleTodoReducer = (state, action) => {
    return state.map((todo) => {
        if (todo.id === action.id) {
            return {...todo, complete: !todo.complete, updatedTime: Date.now()}
        } else {
            return todo
        }
    })
}


const updateTodoReducer = (state, action) => {
    return state.map((todo) => {
        if (todo.id === action.todo.id) {
            return {...todo, [action.target]: action.todo[action.target], updatedTime: Date.now()}
        } else {
            return todo
        }
    })
}


const updateCommentReducer = (state, action) => {
    return state.map((todo) => {
        if (todo.id === action.id) {
            return {...todo, updatedTime: Date.now(), comments: [...todo.comments, action.comment]}
        } else {
            return todo
        }
    })
}

const saveTodoReducer = (state, action) => {
    return state.todos
}


export default createReducer([], {
    [FETCH_TODO]: fetchTodoReducer,
    [CREATE_TODO]: createTodoReducer,
    [DELETE_TODO]: deleteTodoReducer,
    [UPDATE_TODO]: updateTodoReducer,
    [TOGGLE_TODO]: toggleTodoReducer,
    [UPDATE_COMMENT]: updateCommentReducer,
    [SAVE_TODO]: saveTodoReducer,
})