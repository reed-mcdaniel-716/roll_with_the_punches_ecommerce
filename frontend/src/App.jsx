import React, { useContext, useState, useEffect } from 'react';
import NavBar from './components/navigation/NavBar';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Home from './pages/Home';

function App() {
  const user = useUserContext();
  console.log('user in the <App/> component:', user);
  return <>{user?.loggedIn === true ? <Home /> : <Navigate to="/login" />}</>;
}

export default App;

// figure out why the context update is not causing the App to rerender with new user value
