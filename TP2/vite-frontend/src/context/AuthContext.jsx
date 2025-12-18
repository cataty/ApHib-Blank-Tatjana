import { useState, createContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'admin');

    function login(userData, token) {
        setUser(userData);
        setToken(token);
        setIsAdmin(userData.role === 'admin'); // if userData.role === 'admin', set isAdmin to true
        localStorage.setItem('token', token); // Store token in localStorage
        localStorage.setItem('isAdmin', userData.role === 'admin'); // Store user role in localStorage
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setUser(null);
        setToken(null);
        setIsAdmin(false);
    }

    return (
        <AuthContext.Provider value={{ user, token, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };