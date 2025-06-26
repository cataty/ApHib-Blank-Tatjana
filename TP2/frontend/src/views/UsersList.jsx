import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from '../components/Header'
import ListItem from '../components/ListItem';

function UsersList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState({ _id: '', name: '', email: '' });
    const [refresh, setRefresh] = useState(false);
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
    }, [refresh]);


    function handleRefresh() {
        setRefresh(prev => !prev); // Toggle to trigger useEffect
    }

    function handleChange(event) {
        setSearchParams({ ...searchParams, [event.target.name]: event.target.value })
    }

    async function searchUserByName(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}users/search/name?name=${searchParams.name}`);
            if (response.ok) {
                const { data } = await response.json();
                setUsers(data);
            } else {
                alert('Something went wrong fetching the user by name');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching user by name');
        }
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
        <form action="" onSubmit={() => { searchUserByName() }}>
              <label htmlFor="searchName">Type in a name to search for it</label>
                <input
                    type="text"
                    name="name"
                    id="searchName"
                    placeholder="Search by name"
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
        </form>

        <button onClick={() => navigate('/users/create')}>
            Create User
        </button>
        <ul>
            {users.map(user => (
                <ListItem
                    onRefresh={handleRefresh}
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    email={user.email}
                    image={user.avatar}
                />
            ))}
        </ul>
    </>
)
}

export default UsersList