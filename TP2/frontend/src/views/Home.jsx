import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const fromLogin = (location.state?.from === '/login') ? true : false;
  const message = location.state?.message;
  const [count, setCount] = useState(0);
  let loginState = false;



  return (
    <>
      <div className="home">
        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        <div className="w-100 lg:w-1/2 p-10">
          <div className="home-img">
            <img src="/img/cocktail-home-illu.png" />
          </div>
        </div>
        <div>
          <Header title="        Welcome to the Cocktail & Beverage Hub!" />
        {fromLogin && (
          <h4>Welcome back! You now have full access to all out cocktail recipies and beverages. Feel free to add your own recipe, if you like!</h4>
        )}
          <p className="">
            Discover, create, and share your favorite cocktail and beverage recipes. Log in to add your own creations or browse our growing collection for inspiration. Cheers to great drinks and good company!
          </p>

          {token && ( // Only render if user is logged in
            <div className='buttons'>
              <button onClick={() => navigate('/cocktails/create')}>Add Cocktail</button>
              <button onClick={() => navigate('/beverages/create')}>Add Beverage</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home;