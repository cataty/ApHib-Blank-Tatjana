import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';

import Home from './views/Home';
import UsersList from './views/UsersList';
import CocktailsList from './views/CocktailsList';
import BeveragesList from './views/BeveragesList';
import NotFound from './views/NotFound'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/cocktails'>Cocktails</NavLink></li>
            <li><NavLink to='/beverages'>Beverages</NavLink></li>
            <li><NavLink to='/users'>Users</NavLink></li>
            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<CocktailsList />} />
          <Route path="/beverages" element={<BeveragesList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
