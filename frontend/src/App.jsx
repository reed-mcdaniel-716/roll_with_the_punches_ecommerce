import React, { useContext, useState } from 'react';
import NavBar from './components/navigation/NavBar';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';

function App() {
  const user = useContext(UserContext);
  return (
    <>
      <NavBar />
      {user?.loggedIn === true ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
}

export default App;
