import { useState, useEffect } from "react"
import Header from '../components/Header'

export default function User() {
        const API_URL = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate fetching user data
        const fetchUser = async () => {
            const response = await fetch('/api/user'); // Adjust the API endpoint as needed
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    return (
        <>
            <Header>User Profile</Header>
            {user ? (
                <div>
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    );
}

