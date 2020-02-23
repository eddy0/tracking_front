import {Menu, Dropdown, Avatar} from 'antd'
import {useDispatch} from 'react-redux'
import {handleLogout} from '../actions/userAction'
import {useRouter} from 'next/router'


const LoginMenu = (props) => {
    const router = useRouter()

    const logout = () => {
        props.dispatch(handleLogout(() => {
            router.push('/login')
        }))

    }
    return (
        <Menu>
            <Menu.Item onClick={() => logout()}>
                logout
            </Menu.Item>
        </Menu>
    )
}

const UserLogin = ({user}) => {
    const dispatch = useDispatch()

    return (
        <Dropdown overlay={() => <LoginMenu dispatch={dispatch}/>}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {/*<Avatar icon="user"/>*/}
                <Avatar>{user.username.split(' ')[0]}</Avatar>
            </a>
        </Dropdown>
    )
}

export default UserLogin