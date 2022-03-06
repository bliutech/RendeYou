import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { UserDataProvider } from './context/UserDataProvider.js';
ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
