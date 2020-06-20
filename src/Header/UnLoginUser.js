import React from 'react';
import {Link} from 'react-router-dom'

function UnLoginUser(props) {
    return (
        <div className="header-login">
            <Link to="/login" className="login">Sign in</Link>
            <Link to="/register" className="register">Get Started</Link>
        </div>
    );
}

export default UnLoginUser;