import { useState, useEffect } from "react"
import Header from '../components/Header'

function UsersList() {
    const host = 'http://127.0.0.1:5000/api/'
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ _id: '', name: '', email: '', password: '' });

    async function fetchUsers() {
        try {
            const response = await fetch(`${host}users`);

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
        fetchUsers();
    }, []);

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
            const response = await fetch(`${host}users`, options);

            if (response.ok) {
                const { data } = await response.json();
            } else {
                alert('Something went wrong saving the user');
            }
        } catch (error) {
            console.error(error);
            console.log('Error saving the user');
        }
    }



    return (
        <>
            <Header>List of Users</Header>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>)
                    }
                </tbody>
            </table>

            <form onSubmit={postUser}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button type="submit">Add User</button>
            </form>
        </>
    )
}

export default UsersList