import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    loggedIn: false,
  }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('called useeffect in user context...');
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/current`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        console.log('data from auth context:', { ...data });
        setAuth({ ...data });
      })
      .then(() => setIsLoading(false))
      .catch(err =>
        console.log('An error occured setting auth in context:', err)
      );
  }, []);

  return (
    <UserContext.Provider value={{ auth, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
