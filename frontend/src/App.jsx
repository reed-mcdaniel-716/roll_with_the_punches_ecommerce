import React, { useContext } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/navigation/NavBar';
import PrivateRoute from './components/navigation/PrivateRoute';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { UserContext } from './context/UserContext';
import ErrorPage from './pages/ErrorPage';
import ProductDetails from './components/products/ProductDetails';

const App = () => {
  const { auth } = useContext(UserContext);
  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Router>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage user={auth?.user} />} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
};

export default App;
