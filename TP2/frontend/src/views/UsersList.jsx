import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from '../components/Header'

function UsersList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const [loading, setLoading] = useState(true);

    async function getUsers() {

        try {
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${API_URL}users`, options);
            if (response.ok) {
                const { data } = await response.json();
                setUsers(data);
            } else {
                // Try to parse error as JSON, but fallback to text if it fails
                let errorMsg = '';
                try {
                    const { error } = await response.json();
                    errorMsg = error;
                } catch {
                    errorMsg = await response.text();
                }
                alert('Error fetching the users list: ' + errorMsg);
            }
        } catch (error) {
            console.error(error);

            console.log('Error fetching users list');
        } finally {
            setLoading(false);
        }
    }

    // Fetch users when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getUsers();
    }, []);


    async function handleSearch(event) {
        event.preventDefault();
    }

    async function deleteUser(id) {
        alert('Are you sure you want to delete this user?');
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        try {
            const response = await fetch(`${API_URL}users/${id}`, options);

            if (response.ok) {
                const { data } = await response.json();
                getUsers();
            } else {
                alert('Something went wrong deleting the user');
            }
        } catch (error) {
            console.error(error);
            console.log('Error deleting the user');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>            
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <Header title="List of Users" />
            <hr />
            <form action="" onSubmit={() => { handleSearch() }}>
                <input type="search" placeholder="Search users..." />
                <button type="submit">Search</button>
            </form>

            <button onClick={() => navigate('/users/create')}>
                Create User
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button type="button" onClick={() => navigate(`/users/edit/${user._id}`)}>edit</button>
                                    <button
                                        type="button"
                                        onClick={() => deleteUser(user._id)}
                                    >delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </>
    )
}

export default UsersList