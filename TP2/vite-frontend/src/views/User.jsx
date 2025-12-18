import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Toast from "../components/Toast";

function User() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState({ _id: '', name: '', email: '', password: '', avatar: '' });
    const [username, setUsername] = useState('');
    const location = useLocation();
    const message = location.state?.message;
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

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

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {message &&
                <Toast
                    type={message.type}
                    text={message.text}
                />}
            <Header title={`${username}`} />

            <div className="user-details">
                <div className="user-img">
                    <img
                        src={
                            user.avatar
                                ? `${API_URL.replace(/\/api\/?$/, '/')}${user.avatar}`
                                : '/path/to/placeholder.png'
                        }
                        alt="User avatar"
                    />
                </div>
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button type="button" onClick={() => navigate(`/users/edit/${user._id}`)}>Edit</button>
                </div>
            </div>
        </>
    )
}

export default User;