import axios from 'axios'
import {clean} from '../utils'
import {Api, msg} from './index'


class TodoApi extends Api {

    all() {
        // const url = this.baseUrl + '/todo/'
        const url = '/todo/'
        return this.axios({
            url: url,
            method: 'get',
            // headers: {'z-token': this.getToken()},
        })

    }

    add(data) {
        const url = this.baseUrl + '/todo/add'
        return axios({
            url: url,
            method: 'post',
            data: data,
            headers: {'z-token': this.getToken()}
        })
    }

    update(id, data) {
        const url = this.baseUrl + `/todo/${id}`
        return axios.patch(url, data, {
            headers: {'z-token': this.getToken()}
        })
    }

    toggle(id) {
        const url = this.baseUrl + `/todo/${id}`
        return axios.put(url, '', {
            headers: {'z-token': this.getToken()}
        })
    }

    delete(id) {
        const url = this.baseUrl + `/todo/${id}`
        return axios.delete(url, {
            headers: {'z-token': this.getToken()}
        })
    }

    comment(id, comment) {
        const url = this.baseUrl + '/comment/add'
        return axios.post(url, {id, content: comment.content}, {
            headers: {'z-token': this.getToken()}
        })
    }

}

const getTodos = () => {
    return new TodoApi().all().then((r) => {
        console.log(r)
        if (r.status === 200) {
            console.log(r)
            msg()
            let todos = r.data.map((t) => {
                return clean(t)
            })
            return todos
        } else {
            return []
        }
    })
}
const saveTodos = (todos) => {
    window.localStorage.clear()
    window.localStorage.todos = JSON.stringify(todos)
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
    getTodos,
    saveTodos,
    addTodos,
    toggleTodo,
    updateTodo,
    addComment,
    deleteTodo,
}