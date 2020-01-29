import * as uuid from 'uuid'
import axios from 'axios'
import {handleDeleteTodo} from './actions/todoAction'

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
        this.baseUrl = 'http://localhost:5000'
    }


    all() {
        const url = this.baseUrl + '/todo'
        return fetch(url).then(t => t.json())
    }

    add(data) {
        const url = this.baseUrl + '/todo/add'
        return axios({
            url: url,
            method: 'post',
            data: data,
        })
    }

    update(id, data) {
        const url = this.baseUrl + `/todo/${id}`
        return axios.patch(url, data)
    }

    toggle(id) {
        const url = this.baseUrl + `/todo/${id}`
        return axios.put(url)
    }

    delete(id) {
        const url = this.baseUrl + `/todo/${id}`
        return axios.delete(url)
    }

    comment(id, comment) {
        const url = this.baseUrl + '/comment/add'
        return axios.post(url, {id, content: comment.content})
    }

}

const transfer = (str) => {
    let l = str.split('_')
    if (l.length <= 1) {
        return str
    } else {
        const r = l.map((item, index) => {
            if (index === 0) {
                return item
            } else {
                let a = item[0].toUpperCase()
                a = a + item.slice(1)
                return a
            }
        })
        return r.join('')
    }
}

const clean = (data) => {
    let d = {}
    Object.keys(data).map((key) => {
        const value = data[key]
        let k = transfer(key)
        d[k] = value
    })
    return d

}

const getTodos = () => {
    return new TodoApi().all().then((todos) => {
        todos = todos.map((t) => {
            return clean(t)
        })
        return todos
    })
}

const addTodos = (todo) => {
    return new TodoApi().add(todo).then((r) => {
        if (r.status === 200) {
            let d = clean(r.data)
            return d
        }
    })
}

const toggleTodo = (id) => {
    return new TodoApi().toggle(id).then((r) => {
        console.log('r', r)
        return r
    })
}

const updateTodo = (id, data) => {
    return new TodoApi().update(id, data).then((r) => {
        if (r.status === 200) {
            console.log(r)
            let d = clean(r.data)
            return d
        }
    })

}

const addComment = (id, data) => {
    return new TodoApi().comment(id, data).then((r) => {
        if (r.status === 200) {
            console.log(r)
            let d = clean(r.data)
            return d
        }
    })
}

const deleteTodo = (id) => {
    return new TodoApi().delete(id)
}

export {
    log,
    getTodos,
    addTodos,
    saveTodos,
    toggleTodo,
    updateTodo,
    deleteTodo,
    addComment,
    now,
}