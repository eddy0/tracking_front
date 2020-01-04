import * as uuid from "uuid";

const log = console.log.bind(console)


const createTodo = (todo) => {
    let obj = {}
    const id = uuid.v4()
    const time = new Date(Date.now()).toLocaleDateString()
    todo.complete = false
    todo.id = id
    todo.key = id
    todo.time= time
    obj[id] = todo
    return obj
}

const saveTodos = (todos) => {
    window.localStorage.clear()
    window.localStorage.todos = JSON.stringify(todos)
}

const initTodos = () => {
    const todos = window.localStorage.getItem('todos')
    if ( todos === null) {
        return {}
    } else {
        return JSON.parse(todos)
    }
}

export {
    log,
    createTodo,
    initTodos,
    saveTodos,
}