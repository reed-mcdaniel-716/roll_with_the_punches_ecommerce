import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    loggedIn: false,
  }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/current`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => {
        setAuth({ ...data });
      })
      .then(() => setIsLoading(false))
      .catch(err =>
        console.error('An error occured setting auth in context:', err)
      );
  }, []);

  return (
    <UserContext.Provider value={{ auth, isLoading, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
