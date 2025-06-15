import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from '../components/Header'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'
import TodoForm from '../components/TodoForm' 

import Home from '../views/home'
import Tasks from '../views/Tasks'
import NotFound from '../views/NotFound'

import { Routes, Route, NavLink } from 'react-router-dom'


function App() {

  return (
    <>
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/tasks'>Tasks</NavLink></li>
      </ul>
    </nav>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/tasks" element={<Tasks />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </>
  )
}

export default App
