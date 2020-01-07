import * as uuid from "uuid";

const log = console.log.bind(console)


const createTodo = ({todo, note}) => {
    const t = {}
    const id = uuid.v4()
    const time = new Date(Date.now()).toLocaleDateString()
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
    const todos = window.localStorage.getItem('todos')
    if (todos === null) {
        return []
    } else {
        return JSON.parse(todos)
    }
}

export {
    log,
    createTodo,
    getTodos,
    saveTodos,
}