import { Route, Routes, NavLink } from 'react-router-dom'
import Cocktail from '../views/Cocktail';

function ListItem({ id, name, image = "" }) {
    return (
        <li className="">
            <h3>{id}: {name}</h3>
            <NavLink to={`/cocktails/${id}`}>View</NavLink>

            <Routes>
                <Route path={`/cocktails/${id}`} element={<Cocktail id={id} />} />
            </Routes>
        </li>

    )
}

export default ListItem