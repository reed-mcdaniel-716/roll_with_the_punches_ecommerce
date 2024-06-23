import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    loggedIn: false,
  }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(
      `fetching user in useeffect from ${process.env.REACT_APP_SERVER_URL}/users/current`
    );
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/current`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        console.log('Auth data:', data);
        setAuth({ ...data });
      })
      .then(() => setIsLoading(false))
      .catch(err =>
        console.log('An error occured setting auth in context:', err)
      );
  }, []);

  return (
    <UserContext.Provider value={{ auth, isLoading, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};
