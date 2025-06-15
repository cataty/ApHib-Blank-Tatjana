import { useState } from 'react';

import Header from '../components/Header'

function Login (){

    const [user, setUser] = useState({username: '', password: ''});

    function handleChange(event){
       setUser({ ...user, [event.target.name]: event.target.value })
    }

    function handleLogin(event){
        event.preventDefault();
    }

    return(
        <>
        <Header>Login</Header>
        <form action="" onSubmit={handleLogin}>
                          <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
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
        </form>
    
        </>
    )
}

export default Login;