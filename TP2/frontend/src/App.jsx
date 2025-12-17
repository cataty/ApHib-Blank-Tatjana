import logo from './logo.svg';
import './App.css';
import { Outlet, Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';

import Navbar from './components/Navbar';
import Home from './views/Home';
import User from './views/User';
import UsersList from './views/UsersList';
import UserCreate from './views/UserCreate';
import UserEdit from './views/UserEdit';
import Cocktail from './views/Cocktail';
import CocktailCreate from './views/CocktailCreate';
import CocktailEdit from './views/CocktailEdit';
import CocktailsList from './views/CocktailsList';
import Beverage from './views/Beverage';
import BeverageCreate from './views/BeverageCreate';
import BeverageEdit from './views/BeverageEdit';
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

          <Route path="/cocktails/:id" element={<Cocktail />} />
          <Route path="/cocktails/create" element={
            <PrivateRoute>
              <CocktailCreate />
            </PrivateRoute>
          } />
          <Route path="/cocktails/edit/:id" element={
            <AdminRoute>
              <CocktailEdit />
            </AdminRoute>
          } />
          <Route path="/cocktails/*" element={<CocktailsList />} />


          <Route path="/beverages/:id" element={<Beverage />} />
          <Route path="/beverages/create" element={
            <PrivateRoute>
              <BeverageCreate />
            </PrivateRoute>
          } />
          <Route path="/beverages/edit/:id" element={
            <AdminRoute>
              <BeverageEdit />
            </AdminRoute>
          } />
          <Route path="/beverages/*" element={<BeveragesList />} />




          <Route path="/users/:id" element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } />
          
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/edit/:id" element={
            <PrivateRoute>
              <UserEdit />
            </PrivateRoute>
          } />
          <Route path="/users/*" element={
            <AdminRoute>
              <UsersList />
            </AdminRoute>
          } />
          <Route path="/users/search/*" element={
            <AdminRoute>
              <UsersList />
            </AdminRoute>
          } />
          
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

