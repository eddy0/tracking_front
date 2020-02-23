import { Layout, Menu} from 'antd'
import {useRouter} from 'next/router'
import Link from 'next/link'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import UserLogin from './UserLogin'
import {handleAuth} from '../actions/userAction'


const {Header} = Layout


const Navbar = (props) => {
    const router = useRouter()
    let user = useSelector((state) => state.user)
    const location = router.pathname
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(handleAuth())
    }, [])



    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <div className="logo"
                 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1020}}>
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
                {user !== null &&
                    <UserLogin user={user}/>
                }

            </div>

        </Header>
    )
}




export default Navbar