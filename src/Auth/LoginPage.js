import React, {useContext, useRef, useState} from 'react'
import UserApi from '../api/api'
import {RootContext} from '../App'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'

function LoginPage(props) {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => handleSubmit(values)
    })
    const {dispatch} = useContext(RootContext)
    const [hint, setHint] = useState(false)
    const [Submitting, setSubmitting] = useState(false)
    const history = useHistory()

    const handleSubmit = (values) => {
        setSubmitting(false)
        let data = {
            username: values.username,
            password: values.password,
        }

        UserApi.login(data).then((res) => {
            console.log(res)
            const {code, data} = res
            if (code === 0) {
                console.log('code', data.user)
                dispatch({
                    type: 'LOGIN',
                    payload: {user: data.user, token: data.token}
                })
                history.push('/')
            } else {
                console.log('error', data.message)
                setHint(data.message)
            }
        }).catch((err) => {
                console.log(err)
                setHint(err.message || 'something wrong with internet')
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

                    <form  onSubmit={formik.handleSubmit} >
                        <div className="login-inputWrapper">
                            <input className="login-input login-username" name="username" type="text"
                                   placeholder="username" {...formik.getFieldProps('username')}/>
                            <input className="login-input login-password" name="password" type="password"
                                   placeholder="password" {...formik.getFieldProps('password')}/>
                            <span className="hint"
                                  style={{
                                      display: 'block',
                                      fontSize: 14,
                                      height: 20,
                                      color: 'salmon'
                                  }}>
                                {hint}
                            </span>
                        </div>
                        <div className="login-btns">
                            <button type="submit" className="login-btn login-submit">
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