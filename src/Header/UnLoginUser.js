import React from 'react';

function UnLoginUser(props) {
    return (
        <div className="header-login">
            <a href="/login" className="login">Sign in</a>
            <a href="/register" className="register">Get Started</a>
        </div>
    );
}

export default UnLoginUser;