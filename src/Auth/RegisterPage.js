import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Checkbox} from 'antd';

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

const LoginForm = () => {
    const [form] = Form.useForm();


    const onFinish = (values) => {
        log(values)
        
    }


    return (
        <Form form={form} name="login_form" onFinish={onFinish}>
            <Form.Item
                name="username"
                label="username"
                rules={[
                    {
                        required: true,
                        message: 'Input username',
                    },
                ]}
            >
                <Input className="register-input register-username" placeholder="Please input your name"/>
            </Form.Item>
            <Form.Item
                name="password"
                label="password"
                rules={[
                    {
                        required: true,
                        message: 'Input password',
                    },
                ]}
            >
                <Input type="password" className="register-input register-password"
                       placeholder="Please input your password"/>
            </Form.Item>
            <Form.Item>
                <Form.Item>
                    <Button className={'register-btn'} type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form.Item>
        </Form>
    );
};


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
                        <a href="/login">Sign in.</a>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default LoginPage;