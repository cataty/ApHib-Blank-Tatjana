import { Route, Routes, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Cocktail from '../views/Cocktail';
import Beverage from '../views/Beverage';
import User from '../views/User';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function ListItem({ id, name, image = "" }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const { isAdmin } = useContext(AuthContext);
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

    function onDelete(id) {
            async function deleteUser(id) { 
            alert(`Are you sure you want to delete this ${itemType}?`);
            if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
                return;
            }
        const options = {
            method: `DELETE`,
        }
        try {
            const response = await fetch(`${API_URL}${itemType}s/${id}`, options);

            if (response.ok) {
                const { data } = await response.json();
                // getUsers(); TODO CHANGE FUNCTION PRGRAMMATICALLY!!!!!!!!!!!!!!!!!!
            } else {
                alert(`Something went wrong deleting the ${itemType}`);
            }
        } catch (error) {
            console.error(error);
            console.log(`Error deleting the ${itemType}`);
        }
    }
    }

    return (
        <li className="">
            <NavLink to={`/${itemType}s/${id}`}><h3> {name}</h3></NavLink>

            <Routes>
                <Route path={`${itemType}s/${id}`} element={<ViewComponent id={id} />} />
            </Routes>
            {isAdmin && (
                <>
                    <button type="button" onClick={() => onEdit(id)}>edit</button>
                    <button type="button" onClick={() => onDelete(id)}>delete</button>
                </>
            )}
        </li>

    )
}

export default ListItem