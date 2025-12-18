import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from  '../context/AuthContext';

function AdminRoute({ children }) {

    // Access the user from AuthContext       
    const { user, isAdmin} = useContext(AuthContext);

    if (!user || !isAdmin) {
        return <Navigate to="/login" />;
    }

    // Render children if provided, otherwise render <Outlet />
    return children ?? <Outlet />;

}

export default AdminRoute;
