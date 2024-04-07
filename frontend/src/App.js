import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import ProductListings from './pages/ProductListings';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <div>Hello World!</div>,
      errorElement: <ErrorPage />
    },
    {
      path: "/products",
      element: <ProductListings />
    }
  ]
)
function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;
