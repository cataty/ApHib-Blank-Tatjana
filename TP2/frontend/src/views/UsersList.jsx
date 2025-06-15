import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import Header from '../components/Header'

function UsersList() {
    const API_URL = 'http://127.0.0.1:5000/api/' // TODO: Move to a config file
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ _id: '', name: '', email: '', password: '' });
    const navigate = useNavigate();

    async function getUsers() {
        try {
            const response = await fetch(`${API_URL}users`);

            if (response.ok) {
                const { data } = await response.json();
                setUsers(data);
            } else {
                alert('Something went wrong fetching the users list');
            }
        } catch (error) {
            console.error(error);
            console.log('Error fetching users list');
        }
    }

    useEffect(() => {
        getUsers();
    }, []);


    async function handleSearch(event) {
        event.preventDefault();  
    }            

    async function postUser(event) {
        event.preventDefault();
        console.log(user)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }
        try {
            const response = await fetch(`${API_URL}users`, options); // TODO: validate input, change error msg language

            if (response.ok) {
                const { data } = await response.json();
                getUsers();
                setUser({ _id: '', name: '', email: '', password: '' }); // Reset form
            } else {
                const {error} = await response.json();
                alert('Something went wrong: ' + error);
            }
        } catch (error) {
            console.error(error);
            console.log('Error saving the user');
        }
    }

    async function deleteUser(id) {
            alert('Are you sure you want to delete this user?');
            if (!window.confirm('Are you sure you want to delete this user?')) {
                return;
            }
        const options = {
            method: 'DELETE',
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



    return (
        <>
            <Header>List of Users</Header>
            <hr />
            <form action="" onSubmit={() => {handleSearch(event)}}>
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