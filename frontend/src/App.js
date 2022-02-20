import React from 'react'
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
import PrivateRoute from './pages/PrivateRoute'
import Dashboard from './pages/Dashboard'

function App() {
  let isLoggedin = false
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/' exact={true}>
            <Route path='/'>
              <Dashboard></Dashboard>
            </Route>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
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
