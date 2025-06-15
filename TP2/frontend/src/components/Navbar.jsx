import {NavLink} from  'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/cocktails">Cocktails</NavLink></li>
                <li><NavLink to="/beverages">Beverages</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <NavLink to="/test">Test</NavLink>
            </ul>
        </nav>
    );
}

export default Navbar