import React, { useState, useEffect } from 'react';

function Home (){

    
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

        <h4>{user.nombre}</h4>
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