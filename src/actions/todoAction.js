import {getTodos} from "../utils";

const FETCH_TODO = 'FETCH_TODO'
const CREATE_TODO = 'CREATE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'

const actionFetchTodo = (todo) => {
    return {
        type: FETCH_TODO,
        todos: todo
    }
}

const handleFetchTodos = () => {
    return (dispatch) => {
        getTodos().then((todos) => {
            dispatch(actionFetchTodo(todos))
        })
    }
}


export {
    FETCH_TODO,
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    handleFetchTodos,
}