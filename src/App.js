import React from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'
import * as uuid from 'uuid'
import {BrowserRouter, Route, Switch} from "react-router-dom";


function App() {
    const [todos, setTodos] = React.useState({})

    const handleAddTodo = (todo) => {
        let obj = {}
        const id = uuid.v4()
        todo.complete = false
        todo.id = id
        obj[id] = todo
        setTodos((t) => Object.assign({}, t, obj))
    }

    return (
        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact render={(props) => <TodoAdd {...props} handleAddTodo={handleAddTodo}/>}/>
                    <Route path={'/todo'} render={() => <TodoList todos={todos}/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
