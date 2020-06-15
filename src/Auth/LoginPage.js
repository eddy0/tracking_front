import React from 'react';

function LoginPage(props) {
    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-container">
                    <div className="login-title">
                        Welcome Back
                    </div>
                    <form action="/login" method="post" id="signin">
                        <div className="login-inputWrapper">
                            <input className="login-input login-username" name="username" type="text"
                                   placeholder="username"/>
                            <input className="login-input login-password" name="password" type="password"
                                   placeholder="password"/>
                            <span className="hint"
                                  style={{display: 'block', fontSize: 14, lineHeight: 20, height: 20, color: 'salmon'}}>
                    
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