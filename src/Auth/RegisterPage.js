import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useFormik} from 'formik'
import UserApi from '../api'
import {RootContext} from '../App'


const log = console.log.bind(console)


const validUsername = (s) => {
    let status = {
        start: true,
        end: true,
        min: true,
        max: true,
        type: true,
    }
    let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = '0123456789'
    let special = '_'
    let rules = letter + number + special
    if (!letter.includes(s[0])) {
        status.start = false
        return {
            valid: false,
            message: '只能字母开头'
        }
    }
    if (!(letter + number).includes(s[s.length - 1])) {
        status.end = false
        return {
            valid: false,
            message: '只能字母或数字结尾'
        }
    }
    if (s.length < 3) {
        status.min = false
        return {
            valid: false,
            message: '最小长度3'
        }
    }
    if (s.length > 10) {
        status.max = false
        return {
            valid: false,
            message: '最大长度10'
        }
    }
    return {
        valid: true,
        message: 'ok'
    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length < 2) {
        errors.username = 'Must be more'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 2) {
        errors.password = 'Must be more than 3'
    }

    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }

    return errors
}

const LoginForm = () => {
    const {dispatch} = useContext(RootContext)
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: values => handleSubmit(values)
    })

    const handleSubmit = (values) => {
        let data = {
            username: values.username,
            password: values.password,
        }

        UserApi.register(data).then((res) => {
            if (res.data.code === 200) {
                console.log('code', res.data.user)
                dispatch({
                    type: 'LOGIN',
                    payload: {user: res.data.user, token: res.data.token}
                })
                history.push('/')
            } else {
                console.log('error', res.data.message)
            }
        }).catch((err) => {
                console.log(err)
            }
        )
    }

    return (
        <form name="login_form" onSubmit={formik.handleSubmit}>
            <div className="register-inputWrapper" style={{position: 'relative'}}>
                <input type={'text'} name={'username'} {...formik.getFieldProps('username')}
                       className="register-input register-username" placeholder="Please input your name"/>
                <div className={'hint'}>
                    {formik.touched.username && formik.errors.username ? (
                        <span> {formik.errors.username}</span>
                    ) : null}
                </div>
                <input {...formik.getFieldProps('password')} type={'password'} name={'password'}
                       className="register-input register-password"
                       placeholder="Please input your password"/>
                <div className={'hint'}>
                    {formik.touched.password && formik.errors.password ? (
                        <span> {formik.errors.password}</span>
                    ) : null}
                </div>
                <div className="register-btns">
                    <button className={'register-btn'} type="submit">
                        Register
                    </button>
                </div>
            </div>
        </form>
    )
}


function LoginPage(props) {
    return (
        <div className="register-wrapper">
            <div className="register-box">
                <div className="register-container">
                    <div className="register-title">
                        Welcome to Join us
                    </div>
                    <LoginForm/>
                    <div className="register-signup">
                        <span>Already has account? </span>
                        <Link to="/login">Sign in.</Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default LoginPage