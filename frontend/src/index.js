import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './context/UserContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// update to create a nav bar
root.render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>
);
