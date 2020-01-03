import * as uuid from "uuid";

const log = console.log.bind(console)


const createTodo = (todo) => {
    let obj = {}
    const id = uuid.v4()
    todo.complete = false
    todo.id = id
    todo.key = id
    obj[id] = todo
    return obj
}

export {
    log,
    createTodo,
}