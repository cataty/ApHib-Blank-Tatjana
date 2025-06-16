import logo from './logo.svg';
import './App.css';
import { Outlet, Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

import Navbar from './components/Navbar';
import Home from './views/Home';
import UsersList from './views/UsersList';
import UserCreate from './views/UserCreate';
import UserEdit from './views/UserEdit';
import CocktailCreate from './views/CocktailCreate';
import CocktailEdit from './views/CocktailEdit';
import BeverageCreate from './views/BeverageCreate';
import BeverageEdit from './views/BeverageEdit';
import CocktailsList from './views/CocktailsList';
import BeveragesList from './views/BeveragesList';
import Login from './views/Login';
import NotFound from './views/NotFound';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<CocktailsList />} />
          <Route path="/cocktails/create" element={
            <PrivateRoute>
              <CocktailCreate />
            </PrivateRoute>
          } />
          <Route path="/cocktails" element={<CocktailsList />} />
          <Route path="/cocktails/edit/:id" element={
            <PrivateRoute>
              <CocktailEdit />
            </PrivateRoute>
          } />
          <Route path="/beverages" element={<BeveragesList />} />
          <Route path="/users" element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          } />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

