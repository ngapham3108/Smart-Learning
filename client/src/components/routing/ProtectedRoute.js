import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { AuthContext } from '../../contexts/AuthContext';
import NavbarMenu from '../../views/NavbarMenu';

const ProtectedRoute = ({ children }) => {
    let content;
    const {
        authState: { isAuthenticated, authLoading },
    } = React.useContext(AuthContext);

    if (authLoading) {
        return (
            <div className="spiner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }
    if (isAuthenticated) {
        content = (
            <>
                <NavbarMenu />
                {children}
            </>
        );
    } else {
        content = <Navigate to="/login" />;
    }
    return content;
};

export default ProtectedRoute;
