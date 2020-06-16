import React, {useRef, useState} from 'react';
import {Form} from "antd";
import useAxios from 'axios-hooks'
import axios from "axios";
import UserApi from "../api";

function LoginPage(props) {
    const username = useRef()
    const password = useRef()


    const handleSubmit = (e) => {
        console.log(username.current.value)
        console.log(password.current.value)
        let data = {
            username: username.current.value,
            password: password.current.value
        }

        UserApi.login(data).then(e => console.log(e.data))

    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-container">
                    <div className="login-title">
                        Welcome Back
                    </div>

                    <form onSubmit={handleSubmit} action="localhost:3000/login" method="post" id="signin">
                        <div className="login-inputWrapper">
                            <input className="login-input login-username" name="username" type="text"
                                   placeholder="username" ref={username}/>
                            <input className="login-input login-password" name="password" type="password"
                                   placeholder="password" ref={password}/>
                            <span className="hint"
                                  style={{
                                      display: 'block',
                                      fontSize: 14,
                                      lineHeight: 20,
                                      height: 20,
                                      color: 'salmon'
                                  }}>

                            </span>
                        </div>
                        <div className="login-btns">
                            {/*<input name="nextUrl" type="text" value="{{ flash.nextUrl }}" hidden style="display: none">*/}
                            {/*    <input name="nextUrl" type="text" value="{{ nextUrl }}" hidden style="display: none">*/}
                            <button type="submit" className="login-btn login-submit">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="login-signup">
                        <span>No account? </span>
                        <a href="/register">Create one.</a>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default LoginPage;