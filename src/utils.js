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

const saveToken = (token) => {
    window.localStorage.token = token
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

class Api {
    constructor() {
        this.baseUrl = 'http://localhost:5000'
        // this.baseUrl = 'http://45.77.155.210'
        this.token = this.getToken()
    }

    getToken() {
        let token = window.localStorage.token
        if (token === null) {
            token = ''
        }
        return token
    }

}


class TodoApi extends Api {

    all() {
        const url = this.baseUrl + '/todo/'
        log('todo all', url)
        axios.defaults.headers['Content-Type'] = 'application/json'

        let r = axios({
            url: url,
            method: 'get',
            crossorigin: true,
            headers: {'z-token': this.getToken()},
        })
        return r

    }

    add(data) {
        const url = this.baseUrl + '/todo/add'
        return axios({
            url: url,
            method: 'post',
            data: data,
            headers: {'z-token': this.token},
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

class AirwayApi extends Api {

    all() {
        const url = this.baseUrl + '/awb'
        return axios({
            url: url,
            method: 'get',
            headers: {'z-token': this.token}
        })
    }

    add(data) {
        const url = this.baseUrl + '/awb/add'
        return axios({
            url: url,
            method: 'post',
            data: data,
            headers: {'z-token': this.token}
        })
    }

    update(id, data) {
        const url = this.baseUrl + `/awb/${id}`
        return axios({
            method: 'patch',
            url,
            data,
            headers: {'z-token': this.token}
        })
    }

    toggle(id) {
        const url = this.baseUrl + `/awb/${id}`
        return axios({
            method: 'put',
            url,
        })
    }

    delete(id) {
        const url = this.baseUrl + `/awb/${id}`
        return axios.delete(url)
    }

}

class UserApi extends Api {

    auth() {
        const url = this.baseUrl + '/auth'
        return axios({
            url: url,
            method: 'get',
            headers: {'z-token': this.token}
        })
    }

    register(data) {
        const url = this.baseUrl + '/register'
        return axios({
            url: url,
            method: 'post',
            data: data,
        })
    }

    login(data) {
        const url = this.baseUrl + '/login'
        return axios({
            url: url,
            method: 'post',
            data: data,
        })

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
    return new TodoApi().all().then(r => r.data).then((todos) => {
        todos = todos.map((t) => {
            return clean(t)
        })
        return todos
    })
}

const getAwbs = () => {
    return new AirwayApi().all().then((todos) => {
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

const addAwbs = (awb) => {
    return new AirwayApi().add(awb).then((r) => {
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

const toggleAwb = (id) => {
    return new AirwayApi().toggle(id).then((r) => {
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

const updateAwb = (id, data) => {
    return new AirwayApi().update(id, data).then((r) => {
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

const deleteAwb = (id) => {
    return new AirwayApi().delete(id)
}

const register = (form) => {
    return new UserApi().register(form)
}

const login = (form) => {
    return new UserApi().login(form).then(r => {
        if (r.status === 200 && r.data.user !== null) {
            const token = r.data.token
            saveToken(token)
            return r.data.user
        } else {
            return null
        }
    })
}

const getAuth = () => {
    return new UserApi().auth().then((r) => {
        log('r', r)
        if (r.status === 200 && r.data.user !== null) {
            const token = r.data.token
            saveToken(token)
            return r.data.user
        } else {
            return null
        }
    })
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
    getAwbs,
    addAwbs,
    toggleAwb,
    updateAwb,
    deleteAwb,
    register,
    login,
    saveToken,
    getAuth,
    now,
}