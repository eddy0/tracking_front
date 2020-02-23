import {clean} from '../utils'
import {Api, msg} from './index'


class TodoApi extends Api {

    all() {
        // const url = this.baseUrl + '/todo/'
        const url = '/todo/'
        return this.axios.get(url)
    }

    add(data) {
        // const url = this.baseUrl + '/todo/add'
        const url =  '/todo/add'
        return this.axios({
            url: url,
            method: 'post',
            data: data,
        })
    }

    update(id, data) {
        // const url = this.baseUrl + `/todo/${id}`
        const url = `/todo/${id}`
        return this.axios.patch(url, data)
    }

    toggle(id) {
        // const url = this.baseUrl + `/todo/${id}`
        const url =  `/todo/${id}`
        return this.axios.put(url, '')
    }

    delete(id) {
        // const url = this.baseUrl + `/todo/${id}`
        const url = `/todo/${id}`
        return this.axios.delete(url)
    }

    comment(id, comment) {
        // const url = this.baseUrl + '/comment/add'
        const url =  '/comment/add'
        return this.axios.post(url, {id, content: comment.content})
    }

}

const getTodos = () => {
    return new TodoApi().all().then(({data}) => {
        console.log(data)
        let todos = data.map((t) => {
            return clean(t)
        })
        return todos
    })
}



const addTodos = (todo) => {
    return new TodoApi().add(todo).then(({data}) => {
        let d = clean(data)
        return d
    })
}

const toggleTodo = (id) => {
    return new TodoApi().toggle(id).then((r) => {
        return r.data
    })
}

const updateTodo = (id, data) => {
    return new TodoApi().update(id, data).then(({data}) => {
            let d = clean(data)
            return d
    })

}

const addComment = (id, data) => {
    return new TodoApi().comment(id, data).then((r) => {
            console.log(r)
            let d = clean(r.data)
            return d
    })
}

const deleteTodo = (id) => {
    return new TodoApi().delete(id)
}

export {
    getTodos,
    addTodos,
    toggleTodo,
    updateTodo,
    addComment,
    deleteTodo,
}