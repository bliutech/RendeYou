import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Logout from './pages/Logout.js';
import Profile from './pages/Profile.js';
import Meetings from './pages/Meetings.js';
import Error404 from './pages/Error404.js';
import About from './pages/About.js';
import CreateEvents from './pages/Events.js';
import NavBar from './components/NavBar.js';
import { UserDataContext } from './context/UserDataProvider.js';
import Friends from './pages/Friends.js';
import GetUser from './pages/GetUser.js';
import GetEvent from './pages/GetEvent.js';

function App() {
  const { isLoggedin, updateData } = useContext(UserDataContext);

  useEffect(async () => {
    updateData();
  }, []);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={isLoggedin ? <Meetings /> : <Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={isLoggedin ? <Navigate to={'/'} /> : <Login />} />
          <Route path='/register' element={isLoggedin ? <Navigate to={'/'} /> : <Register />} />
          <Route path='/meetings' element={isLoggedin ? <Meetings /> : <Navigate to={'/'} />} />
          <Route path='/logout' element={isLoggedin ? <Logout /> : <Navigate to={'/'} />} />
          <Route path='/profile' element={isLoggedin ? <Profile /> : <Navigate to={'/'} />} />
          <Route path='/friends' element={isLoggedin ? <Friends /> : <Navigate to={'/'} />} />
          <Route path='/event/new' element={isLoggedin ? <CreateEvents /> : <Navigate to={'/'} />} />
          <Route path='/user/:id' element={<GetUser />} />
          <Route path='/event/:id' element={<GetEvent />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
