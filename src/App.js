import React, {useReducer} from 'react'
import './App.css'
import Header from './Header/Header'
import {Route, Switch} from 'react-router'
import Card from './Card/Card'
import LoginPage from './Auth/LoginPage'
import RegisterPage from './Auth/RegisterPage'
import TopicNew from './Topic/TopicNew'
import TopicDetail from './Topic/TopicDetail'
import {Spin} from 'antd'
import reducer from './reducers'


const initialState = {
    isAuth: false,
    user: null,
    token: null,
}


export const RootContext = React.createContext(initialState)


function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || null)
        const token = JSON.parse(localStorage.getItem('token') || null)
        if (user !== null && token !== null) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                    token,
                }
            })
        }
    }, [])


    return (
        <RootContext.Provider value={{state, dispatch}}>
            <div className="App">
                <Spin spinning={false}/>
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
        </RootContext.Provider>
    )
}

export default App
