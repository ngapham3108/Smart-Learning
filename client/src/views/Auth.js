import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';

const Auth = ({ authRoute }) => {
    let body;
    const {
        authState: { isAuthenticated, authLoading },
    } = React.useContext(AuthContext);

    if (authLoading) {
        body = (
            <div className="dflex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        body = <Navigate to="/dashboard" />;
    } else {
        body = (
            <div className="landing-inner">
                <h1>Smart Learning</h1>
                <h4>Tracking Your Learning Path</h4>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </div>
        );
    }
    return (
        <div className="landing">
            <div className="dark-overlay">{body}</div>
        </div>
    );
};

export default Auth;
