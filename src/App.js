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
import {log} from './utils'
import NotFound from './NotFound'

const initialState = {
    isAuth: false,
    user: null,
    token: '',
}


export const RootContext = React.createContext(initialState)


const routes = [
    {
        path: '/',
        component: Card,
        exact: true,
    },
    {
        path: '/topic/new',
        component: TopicNew,
        exact: true,
    },
    {
        path: '/blog',
        component: Card,
        exact: true,
    },
    {
        path: '/topic/:id',
        component: TopicDetail,
    },
    {
        path: '/404',
        component: NotFound,
    },

]

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    React.useEffect(() => {
        const user = localStorage.getItem('user') || null
        const token = localStorage.getItem('token') || ''
        if (user !== null && token !== '') {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: JSON.parse(user),
                    token: token,
                }
            })
        }
    }, [])

    return (
        <RootContext.Provider value={{state, dispatch}}>
            <div className="App">
                <Switch>
                    <Route exact={true} path={'/login'} component={LoginPage}/>
                    <Route exact={true} path={'/register'} component={RegisterPage}/>
                    {routes.map((route, i) => {
                        return <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={props => (
                                <>
                                    <Header/>
                                    <route.component {...props} />
                                </>
                            )}
                        />
                    })}
                </Switch>
            </div>
        </RootContext.Provider>
    )
}

export default App
