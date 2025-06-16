import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from  '../context/AuthContext';

function Navbar() {
    const { user, isAdmin, logout } = useContext(AuthContext);
    const isLoggedIn = !!user
    const navigate = useNavigate();

    console.log('Navbar user:', user);
    console.log('Navbar isAdmin:', isAdmin);

    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/cocktails">Cocktails</NavLink></li>
                <li><NavLink to="/beverages">Beverages</NavLink></li>
                {isAdmin && (
                    <>
                        <li><NavLink to="/users">Users</NavLink></li>
                    </>
                )}
                {isLoggedIn ? (
                    <>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/login" onClick={e => {
                            e.preventDefault(); 
                            logout();
                            navigate('/login');
                        }}>Logout</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/users/create">Register</NavLink></li>
                    </>
                )}

            </ul>
        </nav>
    );
}

export default Navbar;