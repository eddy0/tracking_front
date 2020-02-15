import {addComment, addTodos, deleteTodo, getTodos, toggleTodo, updateTodo} from '../api/todo'
import {log, clean, now, saveToken} from '../utils'
import * as uuid from 'uuid'


const FETCH_TODO = 'FETCH_TODO'
const CREATE_TODO = 'CREATE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const SAVE_TODO = 'SAVE_TODO'

const actionFetchTodo = (todo) => {
    return {
        type: FETCH_TODO,
        todos: todo
    }
}

const handleFetchTodos = (callback) => (dispatch) => {
        getTodos().then((todos) => {
            dispatch(actionFetchTodo(todos))
        }).catch((r) => {
            console.log(r)
            callback()
        })
}

const actionAddTodo = (todo) => {
    return {
        type: CREATE_TODO,
        todo: todo
    }
}

const handleAddTodo = (form) => (dispatch) => {
    const id = uuid.v4()
    const time = Date.now()
    let t = {
        id: id,
        createdTime: time,
        updatedTime: time,
        complete: false,
        comments: [],
    }
    t.todo = form.todo
    t.note = form.note
    addTodos(t).then(() => {
        dispatch(actionAddTodo(t))
    })
}

const actionHandleToggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        id: id
    }
}

const handleToggleTodo = (id) => (dispach) => {
    return toggleTodo(id).then((r) => {
        console.log('action todo', r)
        dispach(actionHandleToggleTodo(id))
    })
}


const actionDeleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id: id
    }
}

const handleDeleteTodo = (id) => (dispatch) => {
    return deleteTodo(id).then((r) => {
        console.log(r)
        dispatch(actionDeleteTodo(id))
    })
}

const actionUpdateTodo = (target, todo) => {
    return {
        type: UPDATE_TODO,
        target,
        todo,
    }
}

const actionUpdateComment = (comment, id) => {
    return {
        type: UPDATE_COMMENT,
        comment,
        id,
    }
}

const handleUpdateComment = (comment, id) => dispatch => {
    return addComment(id, comment).then((r) => {
        dispatch(actionUpdateComment(comment, id))
    })
}

const handleUpdateTodo = (target, todo) => (dispatch) => {
    return updateTodo(todo.id, {[target]: todo[target]}).then((r) => {
        dispatch(actionUpdateTodo(target, todo))
    })
}


export {
    FETCH_TODO,
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    TOGGLE_TODO,
    SAVE_TODO,
    UPDATE_COMMENT,
    handleFetchTodos,
    handleToggleTodo,
    handleDeleteTodo,
    handleUpdateTodo,
    handleAddTodo,
    handleUpdateComment,
}