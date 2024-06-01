import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/graduate';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProductListings from './components/products/ProductListings';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Context from './context/UserContext';

// styling
const theme = extendTheme({
  fonts: {
    heading: `'Graduate', serif`,
    body: `'Graduate', serif`,
  },
  colors: {
    brand: {
      chocolate_cosmos: '#47001Bff',
      rich_black: '#00051Dff',
      magenta_dye: '#BE0567ff',
      vista_blue: '#8AA9FCff',
    },
  },
});

// routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// update to create a nav bar
root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Context>
        <RouterProvider router={router} />
      </Context>
    </ChakraProvider>
  </StrictMode>
);
