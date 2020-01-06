import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const states = {}

const Provider = React.createContext()


ReactDOM.render(
    <Provider.Provider value={states}>
        <App/>
    </Provider.Provider>
    , document.getElementById('root'))

