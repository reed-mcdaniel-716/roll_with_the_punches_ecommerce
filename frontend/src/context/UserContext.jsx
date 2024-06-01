import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState(() => ({
    loggedIn: false,
  }));

  useEffect(() => {
    console.log('called useeffect in user context...');
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/current`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        console.log('data from user context:', { ...data });
        setUser({ ...data });
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default Context;
