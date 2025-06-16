import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function UserCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState({ name: '', email: '', password: '', passwordRepeat: '' });
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
            // TODO: validate input, change error message language
        }
        try {
            const response = await fetch(`${API_URL}users`, options); // TODO: validate input, change error message language

            if (response.ok) {
                const { data } = await response.json();
                setUser({ name: '', email: '', password: '', passwordRepeat: '' }); // Reset 
                setMessage({ text: 'User created successfully', type: 'success' });
                navigate('/users');
            } else {
                const { error } = await response.json();
                alert('Something went wrong during registration: ' + error);
                return;
            }

        } catch (error) {
            console.error(error);
            console.log('Error saving the user');
        }
    }

    return (
        <>
            <Header title="Create User" />
            <p>Fill in the form below to create a new user.</p>

            {message.text && ( //Only render the <h4> element if message.text is not empty, null, or false.
                <h4 className={message.type}>
                    {message.text}
                </h4>
            )}

            <form onSubmit={postUser}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                    value={user.passwordRepeat}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </>
    )
}

export default UserCreate