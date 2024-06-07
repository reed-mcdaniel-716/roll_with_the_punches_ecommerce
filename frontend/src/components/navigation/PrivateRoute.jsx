import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const PrivateRoute = ({ children }) => {
  const { auth, isLoading } = useContext(UserContext);

  console.log('isLoading in PrivateRoute:', isLoading);
  console.log('auth in PrivateRoute:', auth);

  if (isLoading) {
    return <Spinner color="whiteAlpha.900" />;
  }

  if (!auth?.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
