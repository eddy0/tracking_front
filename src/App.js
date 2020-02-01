import React from 'react'
import './App.css'
import TodoAdd from './components/TodoAdd'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import Nav from "./components/Nav"
import {Layout} from "antd"
import Todo from "./components/Todo";
import AWB from './components/AWB'

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
                        <Route path='/awb' component={AWB}/>
                    </Switch>
                </div>
                <Footer style={{position: 'fixed', bottom: '0', width: '100vw', textAlign: 'center'}}>Ant Design ©2020
                    Created Eddy</Footer>
            </React.Fragment>
        </BrowserRouter>

    )
}

export default App