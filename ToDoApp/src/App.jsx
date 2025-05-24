import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from '../components/Header'
import TaskContainer from '../components/TaskContainer'
import Task from '../components/Task'
import Card from '../components/Card'
import ProductsContainer from '../components/ProductsContainer'


function App() {

  let loginState = false;
  const tasks = [
    {
      id: 1,
      titulo: "Comprar víveres",
      descripcion: "Ir al supermercado y comprar leche, pan y frutas.",
      estado: "pendiente"
    },
    {
      id: 2,
      titulo: "Estudiar React",
      descripcion: "Repasar los conceptos de componentes y hooks en React.",
      estado: "en progreso"
    },
    {
      id: 3,
      titulo: "Hacer ejercicio",
      descripcion: "Salir a correr 30 minutos en el parque.",
      estado: "pendiente"
    },
    {
      id: 4,
      titulo: "Llamar a mamá",
      descripcion: "Llamar por teléfono para saber cómo está.",
      estado: "completada"
    },
    {
      id: 5,
      titulo: "Leer un libro",
      descripcion: "Leer al menos un capítulo del libro actual.",
      estado: "pendiente"
    }
  ]

  function saludar() {
    alert('Hola!');
  }

  function passToParrent(name) {
    alert('Padre ' + name);
  }


  return (
    <>

      <Header title="To Do"></Header>
      <button onClick={saludar} type='button'>Saludar</button>


      <TaskContainer>
        {
          tasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              name={task.titulo}
              description={task.descripcion}
              state={task.estado}

            />)
          )
        }
      </TaskContainer>

        <button onClick={() => setCount((count) => count + 1)}>

        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
