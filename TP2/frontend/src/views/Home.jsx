import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function Home (){


  const location = useLocation();
  console.log(location.state.from);

    
  const [user, setUser] = useState({nombre: 'Héctor', apellido: 'Hernández'});
  const [count, setCount] = useState(0);
  
   function cambiarNombre() {
    setUser({...user, nombre: 'Héctor Hernández'});
  } 

  let loginState = false;



  function passToParrent(name) {
    alert('Padre ' + name);
  }


    return(
        <>
        <h2>Home</h2>
        <button onClick={cambiarNombre}>Change Name</button>

{location.state.from === '/login' && (
        <h4>Welcome back, {user.nombre}. You now have full access to all out cocktail recipies and beverages. Feel free to add your own recipe, if you like!</h4>
)}

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        </>
    )
}

export default Home;