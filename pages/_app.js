import React from 'react'
import '../src/index.css'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../src/reducer'
import middleware from '../src/middleware'
import {Layout, Menu} from 'antd'
import Link from 'next/link'
import {useRouter} from 'next/router'


const store = createStore(reducer, middleware)


const {Header} = Layout


const Nav = (props) => {
    const router = useRouter()

    const location = router.pathname

    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[`${location}`]}
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key="/todo"><Link href={'/'}><a> Home</a></Link></Menu.Item>
                <Menu.Item key="/todo/add"><Link href={'/todo/add'}><a>Add</a></Link></Menu.Item>
                <Menu.Item key="/awb"><Link href={'/awb'}><a>AWB List</a></Link></Menu.Item>
            </Menu>
        </Header>
    )
}


function MyApp({Component, props}) {


    return (
        <Provider store={store}>
            <Nav/>
            <div className="container" style={{paddingTop: '100px'}}>

                <Component {...props} />
            </div>
        </Provider>
    )
}


export default MyApp
