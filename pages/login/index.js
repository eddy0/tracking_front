import {Form, Icon, Input, Button, Checkbox} from 'antd'
import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {handleLogin} from '../../src/actions/userAction'
import Link from 'next/link'


const NormalLoginForm = (props) => {

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                dispatch(handleLogin(values, () => {
                    console.log(props)
                    props.history.push('/todo')
                }))
            }
        })
    }

    const {getFieldDecorator} = props.form
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{required: true, message: 'Please input your username!'}],
                })(
                    <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Username"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link href='/register'><a>register now!</a></Link>
            </Form.Item>
        </Form>
    )
}

const Login = Form.create({name: 'normal_login'})(NormalLoginForm)

export default Login

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     }
// }
//
// export default connect(mapStateToProps, {handleLogin})(Login)
