import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from  '../context/AuthContext';

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    // Render children if provided, otherwise render <Outlet />
    return children ?? <Outlet />;
}

export default PrivateRoute;