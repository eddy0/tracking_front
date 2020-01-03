import React from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Nav from "./components/Nav";
import {Layout} from "antd";

const {Footer} = Layout;


function App() {
    const [todos, setTodos] = React.useState({})

    const handleAddTodo = (todo) => {
        setTodos((t) => Object.assign({}, t, todo))
    }

    return (
        <React.Fragment>
            <BrowserRouter>
                <Nav/>
                <div className="container">
                    <Switch>
                        <Redirect exact from={'/'} to={'/todo'} />
                        <Route path='/todo' exact render={() => <TodoList todos={todos}/>}/>
                        <Route path='/todo/add' exact  render={(props) => <TodoAdd {...props} handleAddTodo={handleAddTodo}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer style={{position: 'fixed', bottom: '0', width: '100vw', textAlign: 'center'}}>Ant Design ©2020
                Created Eddy</Footer>
        </React.Fragment>
    )
}

export default App
