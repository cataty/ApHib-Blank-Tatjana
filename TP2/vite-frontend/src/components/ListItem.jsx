import { Route, Routes, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Cocktail from '../views/Cocktail';
import Beverage from '../views/Beverage';
import User from '../views/User';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';

function ListItem({ id, name, image, onRefresh }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const { isAdmin } = useContext(AuthContext);
    const [message, setMessage] = useState({ text: '', type: 'alert' });
    const { token } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    let itemType = '';
    let ViewComponent = null;

    if (location.pathname.includes('cocktails')) {
        itemType = 'cocktail';
        ViewComponent = Cocktail;
    } else if (location.pathname.includes('beverages')) {
        itemType = 'beverage';
        ViewComponent = Beverage;
    } else if (location.pathname.includes('users')) {
        itemType = 'user';
        ViewComponent = User;
    } else {
        return null; // or handle the case where itemType is not recognized
    }

    function onEdit(id) {
        navigate(`/${itemType}s/edit/${id}`)
    }

    async function onDelete(id) {
        console.log(`Deleting ${itemType} with id: ${id}`);
        if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
            return;
        }
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: `DELETE`,
        }
        try {
            const response = await fetch(`${API_URL}${itemType}s/${id}`, options);

            if (response.ok) {
                if (onRefresh) {
                    onRefresh();
                }
            } else {
                const { error } = await response.json();
                setMessage(`Something went wrong deleting the ${itemType}: `, error);
            }
        } catch (error) {
            console.error(error);
            setMessage({ text: `Error deleting the ${itemType}` });
        }
    }

    return (
        <li className="drink-list-item">
            <img src={image ? `${API_URL.replace(/\/api\/?$/, '/')}${image}` : '/img/cocktail_placeholder_1.png'} alt={name} />
            <NavLink to={`/${itemType}s/${id}`}><h3> {name}</h3></NavLink>

            <Routes>
                <Route path={`${itemType}s/${id}`} element={<ViewComponent id={id} />} />
            </Routes>
            {isAdmin && (
                <div className="buttons">
                    <button type="button" onClick={() => onEdit(id)}>Edit</button>
                    <button type="button" onClick={() => onDelete(id)}>Delete</button>
                </div>
            )}
        </li>

    )
}

export default ListItem