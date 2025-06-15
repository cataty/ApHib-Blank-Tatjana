import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Home from './views/Home';
import UsersList from './views/UsersList';
import UserCreate from './views/UserCreate';
import UserEdit from './views/UserEdit';
import CocktailsList from './views/CocktailsList';
import BeveragesList from './views/BeveragesList';
import Login from './views/Login';
import NotFound from './views/NotFound';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        

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
      <main>
        <!--AuthProvider-->
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cocktails" element={<CocktailsList />} />
            <Route path="/beverages" element={<BeveragesList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/users/edit/:id" element={<UserEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        <!--/AuthProvider-->
      </main>
    </div>
  );
}

export default App;

