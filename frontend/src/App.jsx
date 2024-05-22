import React, { createContext, useState } from 'react';
import NavBar from './components/navigation/NavBar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

// auth context
export const AuthContext = createContext({
  isLoggedIn: false,
  setLogin: () => {},
  firstName: '',
  setFirstName: () => {},
});

function App() {
  const location = useLocation();
  const [isLoggedIn, setLogin] = useState(false);
  const [firstName, setFirstName] = useState('');
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLogin, firstName, setFirstName }}
    >
      <NavBar />
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/profile" state={{ from: location }} />
      )}
    </AuthContext.Provider>
  );
}

export default App;
