import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header'

function UserCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState({ name: '', email: '', password: '', passwordRepeat: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'


    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
        setMessage({ ...message, text: "" });
    }

    function handleFocus(event) {
        setMessage({ ...message, text: "" });
    }

    async function postUser(event) {
        event.preventDefault();
        console.log(user)

        // Validations
        if (user.password !== user.passwordRepeat) {
            setMessage({ ...message, text: 'Passwords do not match. Please check your input.' });
            return;
        }
        if (user.name.trim().length < 3) {
            setMessage({ ...message, text: 'Username cannot be less than 3 caracters. Please check your input.' });
            return;
        }
        if (user.email.trim() == '') {
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

        // If all validations pass, proceed to post the user
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
        }
        try {
            const response = await fetch(`${API_URL}users`, options); // TODO: change error message language
            const { data } = await response.json();

            if (response.ok) {
                setUser({ name: '', email: '', password: '', passwordRepeat: '' }); // Reset 
                navigate('/users', { state: { message: { text: "User created successfully!", type: "success" } } });
            } else {
                setMessage({ text: `${data}`, type: 'alert' });
                alert('Something went wrong during registration: ' + data);
                return;
            }

        } catch (error) {
            console.error(error);
            console.log('Error saving the user');
        }
    }

    return (
        <>

            {message.text && ( // Display message if it exists
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <Header title="Create User" />
            <p>Fill in the form below to create a new user.</p>

  

            <form enctype="multipart/form-data" onSubmit={postUser}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <label htmlFor="password">Repeat Password</label>
                <input
                    type="password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                    value={user.passwordRepeat}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <input
                    type="file"
                    id="avatar"
                    name="avatar" 
                >
                </input>
                <button type="submit">Add User</button>
            </form>
        </>
    )
}

export default UserCreate