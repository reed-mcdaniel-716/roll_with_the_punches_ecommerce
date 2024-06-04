import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
  });

  useEffect(() => {
    console.log('called useeffect in user context...');
    const fetchUser = () => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/users/current`, {
        credentials: 'include',
      })
        .then(r => r.json())
        .then(data => {
          console.log('data from user context:', { ...data });
          setUser(_prevUser => {
            const newUser = { ...data };
            return newUser;
          });
        })
        .catch(err => console.log('An error occured setting user in context'));
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
