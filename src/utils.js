import * as uuid from 'uuid'


const log = console.log.bind(console)

const now = (unix) => {
    return new Date(unix).toLocaleDateString('en-US', {hour: '2-digit'})
}


const saveTodo = (todo) => {
    let todos = getTodos()
    const i = todos.findIndex(t => t.id === todo.id)
    if (i === -1) {
        todos.push(todo)
    } else {
        todos[i] = todo
    }
    saveTodos(todos)
    return todos
}

const saveTodos = (todos) => {
    window.localStorage.clear()
    window.localStorage.todos = JSON.stringify(todos)
}

const getTodos1 = () => {
    let todos = window.localStorage.getItem('todos')
    if (todos === null) {
        todos = []
    } else {
        todos = JSON.parse(todos)
    }
    return new Promise((res, rej) => {
        res(todos)
    })
}

class TodoApi {
    constructor() {
        this.baseUrl = 'http://localhost:5000/todo/'
    }


    all() {
        const url = this.baseUrl
        return fetch(url).then(t => t.json())
    }

    add(data) {
        const url = this.baseUrl + 'add'
        return fetch(url, {
            method: 'POST',
            body: data,
        }).then((r) => r.json())
    }

    update(id, data) {
        const url = this.baseUrl + 'todo/' + id
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((r) => r.json())
    }
}



const getTodos = () => {
    return new TodoApi().all().then((todos) => {
        // todos = clean(todos)
        return todos
    })
}

const addTodos = () => {
    return new TodoApi().add().then((todo) => {
        console.log(todo)
        return todo
    })
}



const saveComments = (notes, id) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            let todos = getTodos()
            todos = todos.map((t) => {
                if (t.id === id) {
                    return {...t, note: notes}
                } else {
                    return t
                }
            })
            saveTodos(todos)
            res()
        }, 100)
    })
}


export {

    log,
    getTodos,
    addTodos,
    saveTodos,
    now,
    saveComments,
}