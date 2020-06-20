import React, {useContext} from 'react'
import '../App.css'
import {Button, Layout} from 'antd'
import Logo from './Logo'
import Nav from './Nav'
import UserLogin from './LoginUser'
import UnLoginUser from './UnLoginUser'
import {RootContext} from '../App'


function Header() {
    const {state} = useContext(RootContext)
    const {isAuth, user} = state
    return (
        <header>
            <Layout.Header className={'header'}>
                <div className="header-container">
                    <Logo/>
                    <Nav/>
                    {
                        isAuth === true
                            ? <UserLogin user={user}/>
                            : <UnLoginUser/>
                    }

                </div>

            </Layout.Header>
        </header>
    )
}

export default Header
