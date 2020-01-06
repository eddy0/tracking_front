import React from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import Nav from "./components/Nav"
import {Layout} from "antd"
import {initTodos, saveTodos} from "./utils"
import EditableTable from './components/Table'

const {Footer} = Layout

function App() {
    const [todos, setTodos] = React.useState(() => initTodos())

    const handleAddTodo = (todo) => {
        setTodos((t) => Object.assign({}, t, todo))
    }

    const handleToggleTodo = (todo) => {
        setTodos((todos) => {
            return Object.values(todos).map((t) => {
                if (t.id === todo.id) {
                    return {...t, complete: !t.complete}
                } else {
                    return t
                }
            })
        })
    }

    const handleDeleteTodo = (todo) => {
        setTodos((todos) => {
            return Object.values(todos).filter((t) => {
                return t.id !== todo.id
            })
        })
    }

    const handleTodoUpdate = (todo) => {
        setTodos((todos) => {
            return Object.values(todos).map((t) => {
                if (t.id === todo.id) {
                    return {...t, todo: todo.todo}
                } else {
                    return t
                }
            })
        })
    }

    React.useEffect(() => {
        saveTodos(todos)
    }, [todos])


    let ts = Object.values(todos)

    return (
        <React.Fragment>
            <BrowserRouter>
                <Nav/>
                <div className="container">
                    <Switch>
                        <Redirect exact from={'/'} to={'/todo'}/>
                        <Route path='/todo' exact
                               render={() => <TodoList handleDeleteTodo={handleDeleteTodo}
                                                       handleToggleTodo={handleToggleTodo} todos={ts}/>}/>
                        <Route path='/todo/uncomplete' exact
                               render={() => <TodoList handleDeleteTodo={handleDeleteTodo}
                                                       handleToggleTodo={handleToggleTodo}
                                                       todos={ts.filter(t => t.complete === true)}/>}/>
                        <Route path='/todo/complete' exact
                               render={() => <TodoList handleDeleteTodo={handleDeleteTodo}
                                                       handleToggleTodo={handleToggleTodo}
                                                       todos={ts.filter(t => t.complete === false)}/>}/>
                        <Route path='/test' exact
                               render={() => <EditableTable handleTodoUpdate={handleTodoUpdate} todos={ts}/>}/>
                        <Route path='/todo/add' exact
                               render={(props) => <TodoAdd {...props} handleAddTodo={handleAddTodo}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer style={{position: 'fixed', bottom: '0', width: '100vw', textAlign: 'center'}}>Ant Design ©2020
                Created Eddy</Footer>
        </React.Fragment>
    )
}

export default App
