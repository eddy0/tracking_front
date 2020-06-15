import React from 'react';
import './App.css';
import Header from './Header/Header'
import {Route, Switch} from "react-router";
import Card from './Card/Card'
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import TopicNew from "./Topic/TopicNew";
import TopicDetail from "./Topic/TopicDetail";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact={true} path={'/login'} component={LoginPage}/>
                <Route exact={true} path={'/register'} component={RegisterPage}/>
                <Route>
                    <Header/>
                    <Route path={'/blog'} component={Card}/>
                    <Route exact={true} path={'/topic/new'} component={TopicNew}/>
                    <Route exact={true} path={'/topic/detail'} component={TopicDetail}/>
                </Route>
            </Switch>

        </div>
    );
}

export default App;
