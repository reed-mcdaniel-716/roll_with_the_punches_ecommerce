import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { Center, Container, Spinner } from '@chakra-ui/react';

const PrivateRoute = ({ children }) => {
  const { auth, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
        <Center>
          <Spinner color="whiteAlpha.900" />
        </Center>
      </Container>
    );
  }

  if (!auth?.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
