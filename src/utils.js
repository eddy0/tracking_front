import * as uuid from "uuid";

const log = console.log.bind(console)

const now = (unix) => {
    return new Date(unix).toLocaleDateString('en-US', {hour: '2-digit'})
}

const createTodo = ({todo, note}) => {
    const t = {}
    const id = uuid.v4()
    const time = now(Date.now())
    t.complete = false
    t.id = id
    t.key = id
    t.createdTime = time
    t.updatedTime = time
    t.todo = todo
    // t.note = [{note: note, time: time}]
    t.note = []
    t.lastNote = note
    saveTodo(t)
}

const saveTodo = (todo) => {
    let todos = getTodos();
    const i = todos.findIndex(t => t.id === todo.id);
    if (i === -1) {
        todos.push(todo);
    } else {
        todos[i] = todo;
    }
    saveTodos(todos);
    return todos
}

const saveTodos = (todos) => {
    window.localStorage.clear()
    window.localStorage.todos = JSON.stringify(todos)
}

const getTodos = () => {
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

const saveComments = (notes, id) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            let todos = getTodos();
            todos = todos.map((t) => {
                if (t.id === id) {
                    return {...t, note: notes}
                } else {
                    return t
                }
            })
            saveTodos(todos);
            res()
        }, 100)
    })
}




export {

    log,
    createTodo,
    getTodos,
    saveTodos,
    now,
    saveComments,
}