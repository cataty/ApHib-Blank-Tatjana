import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Toast from "../components/Toast";

function Home() {

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const fromLogin = (location.state?.from === '/login') ? true : false;
  const message = location.state?.message;
  let loginState = false;



  return (
    <>
      <div className="home">
            {message &&
                <Toast
                    type={message.type}
                    text={message.text}
                />}

        <div className="w-100 lg:w-1/2 p-10">
          <div className="home-img">
            <img src="/img/cocktail-home-illu.png" />
          </div>
        </div>
        <div>
          <Header title="        Welcome to the Cocktail & Beverage Hub!" />
          {fromLogin && (
            <h4 className='my-4'>Welcome back! You now have full access to all out cocktail recipies and beverages. Feel free to add your own recipe, if you like!</h4>
          )}
          <p className="">
            Discover, create, and share your favorite cocktail and beverage recipes. Log in to add your own creations or browse our growing collection for inspiration. Cheers to great drinks and good company!
          </p>

          <div className='buttons'>
            {user && ( // Only render if user is logged in
              <>
                <button onClick={() => navigate('/cocktails/create')}>Add Cocktail</button>
                <button onClick={() => navigate('/beverages/create')}>Add Beverage</button>
              </>
            )}
            {!user && ( // Only render if user is not logged in
              <button onClick={() => navigate('/login')}>Login</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;