import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'

function UserEdit() {
    const API_URL = 'http://127.0.0.1:5000/api/' // TODO: Move to a config file
    const [user, setUser] = useState({ _id: '', name: '', email: '', password: '' });
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    async function getUser(id){
         try {
            const response = await fetch(`${API_URL}users/${id}`);
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
         }
    }

    useEffect(() => {
        getUser(id);
    }, [id]);


    async function putUser(event) {
        event.preventDefault();
        console.log(user)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }
        try {
            const response = await fetch(`${API_URL}users/${id}`, options); // TODO: validate input, change error msg language

            if (response.ok) {
                const { data } = await response.json();
                setUser({ _id: '', name: '', email: '', password: '' }); // Reset form
                alert('User edited successfully');
                navigate('/users');
            } else {
                const {error} = await response.json();
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
            <Header title={`Edit User Data: ${username}`} />            <form onSubmit={putUser}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    placeholder={user.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    placeholder={user.email}
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
                <button type="submit">Add User</button>
            </form>
        </>
    )
}

export default UserEdit