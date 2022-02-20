import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Logout from './pages/Logout.js'
import Profile from './pages/Profile.js'
import Meetings from './pages/Meetings.js'
import Error404 from './pages/Error404.js'
import About from './pages/About.js'
import NavBar from './components/NavBar.js'
import Dashboard from './pages/Dashboard'

function App() {
  const [userData, setUserData] = useState([])
  const [isSignedIn, setIsSignedIn] = useState(false)

  if (!isSignedIn) {
    return (
      <Login
        updateUserData={setUserData}
        updateSignedInStatus={setIsSignedIn}
      />
    )
  }

  console.log(userData)
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='*'>
            <Error404></Error404>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
