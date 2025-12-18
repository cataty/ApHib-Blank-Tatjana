import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Toast from "../components/Toast";

function UserEdit() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { user: authUser, token, isAdmin } = useContext(AuthContext);
    const [user, setUser] = useState({ _id: '', name: '', email: '', password: '', avatar: '', passwordNew: '' });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }


    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    async function getUser(id) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await fetch(`${API_URL}users/${id}`, options);
            if (response.ok) {
                const { data } = await response.json();
                setUser(data);
                setUsername(data.name || 'User');
            } else {
                alert('Something went wrong fetching the user data');
            }
        } catch (error) {
            console.error(error);
            console.log('Error fetching user data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser(id);
    }, [id]);


    async function putUser(event) {
        event.preventDefault();
        console.log(user)

        if (user.name.trim().length < 3) {
            setMessage({ ...message, text: 'Username cannot be less than 3 caracters. Please check your input.' });
            return;
        }
        if (user.email.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Email field.' });
            return;
        }
        if (!user.email.trim().includes('@')) {
            setMessage({ ...message, text: 'Invalid email format. Please check your input.' });
            return;
        }
        if (user.passwordNew && user.passwordNew.trim().length <= 6) {
            setMessage({ ...message, text: 'Password must be more than 6 characters long. Please check your input.' });
            return;
        }
        if (user.passwordNew && user.passwordNew !== user.passwordRepeat) {
            setMessage({ ...message, text: 'Passwords do not match. Please check your input.' });
            return;
        }


        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        if (user.passwordNew) {
            formData.append('password', user.passwordNew);
        }
        if (file) {
            formData.append('file', file);
        }

        console.log(formData);

        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        }

        try {
            const response = await fetch(`${API_URL}users/${id}`, options);

            if (response.ok) {
                setUser({ _id: '', name: '', email: '', password: '', avatar: '' }); // Reset form
                if (isAdmin && String(authUser._id) !== String(id)) {
                    navigate('/users', { state: { message: { text: "User edited successfully!", type: "success" } } });
                } else {
                    navigate(`/users/${id}`, { state: { message: { text: "Profile updated successfully!", type: "success" } } });
                }

            } else {
                const { error } = await response.json();
                setMessage('Something went wrong during user update: ' + error);
                return;
            }

        } catch (error) {
            console.error(error);
            console.log('Error saving the user');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {message &&
                <Toast
                    type={message.type}
                    text={message.text}
                />}
                
            <Header title={`Edit User Data`} />

            <form encType="multipart/form-data" onSubmit={putUser}>
                <h2>Edit User: {user.name}</h2>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    placeholder={user.name}
                    onChange={handleChange}
                />

                <label htmlFor="file">Avatar</label>
                <div>
                    <img
                        src={preview ?? `${API_URL.replace(/\/api\/?$/, '/')}${user.avatar}`}
                        alt="User avatar"
                        class="preview"
                    />
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    placeholder={user.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.passwordNew}
                    onChange={handleChange}
                />
                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input
                    type="password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                    value={user.passwordRepeat}
                    onChange={handleChange}
                />
                <button type="submit">Edit User</button>
            </form>
        </>
    )
}

export default UserEdit