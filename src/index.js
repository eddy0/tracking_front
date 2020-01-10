import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {getTodos} from "./utils";


const intialState = getTodos()

const Provider = React.createContext(intialState)


ReactDOM.render(
    <Provider.Provider value={intialState}>
        <App/>
    </Provider.Provider>
    , document.getElementById('root'))

