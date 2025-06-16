import { Outlet, Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function PrivateRoute() {

    // Access the user from AuthContext       
    const { user } = useContext(AuthContext);
    const isLoggedIn = !!user; // if  user is not null or undefined, isLoggedIn will be true

        return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;


}
export default PrivateRoute
