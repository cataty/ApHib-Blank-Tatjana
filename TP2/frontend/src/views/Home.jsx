import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const fromLogin = (location.state?.from === '/login') ? true : false;
  const message = location.state?.message;


  const [user, setUser] = useState({ nombre: 'Héctor', apellido: 'Hernández' });
  const [count, setCount] = useState(0);
  let loginState = false;



  return (
    <>
      <h2>Home</h2>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
      {fromLogin && (
        <h4>Welcome back, {user.nombre}. You now have full access to all out cocktail recipies and beverages. Feel free to add your own recipe, if you like!</h4>
      )}

      <h2>
        Welcome to the Cocktail & Beverage Hub!
      </h2>
      <p className="">  
        Discover, create, and share your favorite cocktail and beverage recipes. Log in to add your own creations or browse our growing collection for inspiration. Cheers to great drinks and good company!
      </p>
      <p>
        {token && ( // Only render if user is logged in
          <>
            <button onClick={() => navigate('/cocktails/create')}>Add Cocktail</button>
            <button onClick={() => navigate('/beverages/create')}>Add Beverage</button>
          </>
        )}
      </p>

    </>
  )
}

export default Home;