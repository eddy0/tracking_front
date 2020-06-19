import React, {useContext, useRef, useState} from 'react'
import UserApi from '../api'
import {RootContext} from '../App'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'


function LoginPage(props) {
    const username = useRef()
    const password = useRef()
    const [hint, setHint] = useState('')
    const {dispatch} = useContext(RootContext)
    const history = useHistory()
    const [submitting, setSubmitting] = useState(false)


    const handleSubmit = (e) => {
        setHint('')
        setSubmitting(true)
        e.preventDefault()
        let data = {
            username: username.current.value,
            password: password.current.value
        }

        UserApi.login(data).then((res) => {
            if (res.data.code === 200) {
                console.log('code', res.data.user)
                dispatch({
                    type: 'LOGIN',
                    payload: {user: res.data.user, token: res.data.token}
                })
                history.push('/')
            } else {
                console.log('error', res.data.message)
                setHint(res.data.message)
            }
        }).catch((err) => {
                console.log(err)
                // setHint(err.message)
            }
        )

        setSubmitting(false)

    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-container">
                    <div className="login-title">
                        Welcome Back
                    </div>
                    <form onSubmit={handleSubmit} id="signin">
                        <div className="login-inputWrapper">
                            <input className="login-input login-username" name="username" type="text"
                                   placeholder="username" ref={username}/>
                            <input className="login-input login-password" name="password" type="password"
                                   placeholder="password" ref={password}/>
                            <span className="hint"
                                  style={{display: 'block', fontSize: '1.4rem', height: 20, color: 'salmon'}}>
                                {hint}
                            </span>
                        </div>
                        <div className="login-btns">
                            <button type="submit" disabled={submitting===true} className="login-btn login-submit">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="login-signup">
                        <span>No account? </span>
                        <Link to="/register">Create one.</Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default LoginPage