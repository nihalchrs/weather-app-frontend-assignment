import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// This HOC checks if the user is authenticated and redirects if necessary
const withAuthRedirect = (WrappedComponent) => {
    const AuthRedirect = (props) => {
        const navigate = useNavigate();
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

        useEffect(() => {
            if (isAuthenticated) {
                navigate('/weather');
            }
        }, [isAuthenticated, navigate]);

        return <WrappedComponent {...props} />;
    };

    return AuthRedirect;
};

export default withAuthRedirect;
