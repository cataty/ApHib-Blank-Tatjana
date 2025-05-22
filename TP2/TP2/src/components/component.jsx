import React from "react";


const Component = (props) => {
    const nombre = 'Julieta';
    let nacimiento = 2001;

  return (
    <>
      <h1>My Component</h1>
      <p>This is a simple component.</p>
      <img src="https://cdn.pixabay.com/photo/2018/04/15/20/19/girl-3322756_960_720.jpg" alt="Placeholder" />
            <p>Hi {nombre}</p>
            <p>Tu edad es: {calcularEdad(nacimiento)}</p>
            <p>Hola {props.nombre}, tu edad es {props.edad}</p>
    </>
  );
}


function calcularEdad(nacimiento){
  let actual = new Date().getFullYear();
  return actual - nacimiento;
}

export default Component