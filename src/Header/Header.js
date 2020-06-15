import React from 'react'
import '../App.css'
import {Button, Layout} from 'antd'
import Logo from './Logo'
import Nav from './Nav'
import UserLogin from "./LoginUser";
import UnLoginUser from "./UnLoginUser";


function Header() {
    return (
        <header>
            <Layout.Header className={'header'}>
                <div className="header-container">
                    <Logo/>
                    <Nav />
                    <UserLogin  />
                    {/*<UnLoginUser />*/}

                </div>

            </Layout.Header>
        </header>
    )
}

export default Header
