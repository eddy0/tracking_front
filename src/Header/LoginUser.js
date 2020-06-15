import {Menu, Dropdown, Avatar} from 'antd'
import React from 'react'

import {useHistory} from 'react-router'
import {Link} from "react-router-dom";


const LoginMenu = (props) => {
    const router = useHistory()

    const logout = () => {
        router.push('/login')

    }
    return (
        <Menu>
            <Menu.Item>
                <Link to={'/topic/new'}>

                    New Topic
                </Link>
            </Menu.Item>
            <Menu.Item onClick={() => logout()}>
                Logout
            </Menu.Item>

        </Menu>
    )
}

const UserLogin = ({user}) => {

    return (

        <Dropdown className={'header-login'} overlay={() => <LoginMenu/>}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Avatar icon="user"/>
                {/*<Avatar>{user.username.split(' ')[0]}</Avatar>*/}
            </a>
        </Dropdown>
    )
}

export default UserLogin