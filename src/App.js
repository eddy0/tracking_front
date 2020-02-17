import React, {useContext} from 'react'
import './App.css'
import TodoAdd from './components/TodoAdd'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Nav from './components/Nav'
import {Layout} from 'antd'
import Todo from './components/Todo'
import AWB from './components/AWB'
import AirWayBillAdd from './components/AirWayBillAdd'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import Login from './components/Login'
import Register from './components/Register'
import {handleAuth} from './actions/userAction'
import {log} from './utils'
import {Spin} from 'antd'


const {Footer} = Layout

const PrivateRoute = ({component: Component, ...rest}) => {
    const loading = useSelector(state => state.loading)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (user === null) {
            dispatch(handleAuth())
        }
    }, [user])

    if (loading === true) {
        return <Spin />
    }

    return (<Route {...rest} render={(props) => {
            const user = window.localStorage.token
            log('usr', user)
            if (user === undefined) {
                return <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            }
            return <Component {...props} />
        }}/>
    )
}

function App() {

    return (
        <BrowserRouter>
            <React.Fragment>
                <Nav/>
                <div className="container" style={{paddingTop: '100px'}}>
                    <Switch>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/register' exact component={Register}/>
                        {/*<Route exact from={'/'} to={'/todo'}/>*/}
                        <PrivateRoute path='/todo/add' exact component={TodoAdd}/>
                        <PrivateRoute path='/awb/add' exact component={AirWayBillAdd}/>
                        <PrivateRoute path='/todo' component={Todo}/>
                        <PrivateRoute path='/awb' component={AWB}/>
                        <PrivateRoute exact path='/' component={Todo}/>
                    </Switch>
                </div>
                <Footer style={{position: 'fixed', bottom: '0', width: '100vw', textAlign: 'center'}}>Ant Design ©2020
                    Created Eddy</Footer>
            </React.Fragment>
        </BrowserRouter>

    )
}

export default App