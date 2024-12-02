import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
    const { user } = useAuth();

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Redirect to="/unauthorized" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
