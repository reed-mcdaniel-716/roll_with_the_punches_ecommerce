import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/graduate';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProductListings from './pages/ProductListings';
import Home from './pages/Home';

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
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/products',
    element: <ProductListings />,
  },
]);
function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
