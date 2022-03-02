import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { LoginProvider, LoginContext } from './context/LoginProvider.js'
import { UserDataProvider } from './context/UserDataProvider.js'
ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
