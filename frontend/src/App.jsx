import React from 'react';
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
import ErrorPage from './pages/ErrorPage';
import ProductDetails from './components/products/ProductDetails';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Router>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
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
