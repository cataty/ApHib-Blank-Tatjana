import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Header from '../components/Header'

function Login() {

    const API_URL = process.env.REACT_APP_API_URL;
    const { login, isAdmin } = useContext(AuthContext);
    const [user, setUser] = useState({ email: '', password: '' });
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();
    const location = useLocation();

    if(location.state?.message) {
        setMessage({ ...message, ...location.state.message });
    }

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    async function handleLogin(event) {
        event.preventDefault();
        // Validations
        if (user.email.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Email field.' });
            return;
        }
        if (!user.email.trim().includes('@')) {
            setMessage({ ...message, text: 'Invalid email format. Please check your input.' });
            return;
        }
        if (user.password.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Password field.' });
            return;
        }
        if (user.password.trim().length <= 6) {
            setMessage({ ...message, text: 'Password must be more than 6 characters long. Please check your input.' });
            return;
        }

        // Submit login
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        }

        try {
            const response = await fetch(`${API_URL}users/login`, options)
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.token) {
                    login(data.user, data.token);
                    navigate('/', { state: { from: location.pathname, message: { text: "Login successfull. Welcome back!", type: "success" } } });
                }

            } else {
                const { error } = await response.json();
                setMessage({ ...message, text: error });
                return;
            }
        } catch (error) {
            console.error(error);
            setMessage({ ...message, text: 'An error occurred during login. Please try again later.' });
        }

    }

    return (
        <>
            <Header title="Login" />
            {message.text && ( // Display message if it exists
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form action="" onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to={'/users/create'}>Register here</Link></p>
            </form>

        </>
    )
}

export default Login;