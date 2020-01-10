import React from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import Nav from "./components/Nav"
import {Layout} from "antd"
import Todo from "./components/Todo";

const {Footer} = Layout

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Nav/>
                <div className="container" style={{paddingTop: '100px'}}>
                    <Switch>
                        <Redirect exact from={'/'} to={'/todo'}/>
                        <Route path='/todo/add' exact component={TodoAdd}/>
                        <Route path='/todo' component={Todo}/>
                    </Switch>
                </div>
                <Footer style={{position: 'fixed', bottom: '0', width: '100vw', textAlign: 'center'}}>Ant Design ©2020
                    Created Eddy</Footer>
            </React.Fragment>
        </BrowserRouter>

    )
}

export default App


{/*<Route path='/todo' exact*/
}
{/*       render={() => <TodoList handleDeleteTodo={handleDeleteTodo}*/
}
{/*                               handleToggleTodo={handleToggleTodo} todos={ts}/>}/>*/
}
{/*<Route path='/todo/uncomplete' exact*/
}
{/*       render={() => <TodoList handleDeleteTodo={handleDeleteTodo}*/
}
{/*                               handleToggleTodo={handleToggleTodo}*/
}
{/*                               todos={ts.filter(t => t.complete === true)}/>}/>*/
}
{/*<Route path='/todo/complete' exact*/
}
{/*       render={() => <TodoList handleDeleteTodo={handleDeleteTodo}*/
}
{/*                               handleToggleTodo={handleToggleTodo}*/
}
{/*                               todos={ts.filter(t => t.complete === false)}/>}/>*/
}
{/*<Route path='/test' exact*/
}
{/*       render={() => <EditableTable handleTodoUpdate={handleTodoUpdate} todos={ts}/>}/>*/
}
