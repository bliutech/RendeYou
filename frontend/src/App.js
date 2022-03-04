import React, { useContext } from 'react';
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
function App() {
  const { isLoggedin } = useContext(UserDataContext);
  return !isLoggedin ? (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Navigate to={'/login'} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to={'/login'} />} />
        </Routes>
      </BrowserRouter>
    </>
  ) : (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={isLoggedin ? <Meetings /> : <Home />} />
          <Route path='/home' element={<Home />} />
          <Route
            path='/meetings'
            element={isLoggedin ? <Meetings /> : <Home />}
          />
          <Route path='/login' element={<Navigate to={'/'} />} />
          <Route path='/register' element={<Navigate to={'/'} />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/event/new' element={<CreateEvents />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*This is your original version of the code. Feel free to delete mine if you want to do it differently. 
I needed to change it for testing purposes.*/
/*
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import checkSession from './components/Util.js';

function App()
{
    let [isLoggedin, setsLoggedin] = useState(false);
    useEffect(async ()=> 
    {
        setsLoggedin(checkSession());
    });

    return(
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={ (isLoggedin ? <Meetings /> : <Home />) } />
                    <Route path='/home' element={<Home />} />
                    <Route path='/meetings' element={ (isLoggedin ? <Meetings /> : <Home />)}/>
                    <Route path='/login' element={ <Login />} />
                    <Route path='/register' element={ <Register />} />
                    <Route path='/logout' element={ <Logout /> } />
                    <Route path='/profile' element={ <Profile /> } />
                    <Route path='/about' element={ <About /> } />
                    <Route path='/event/new' element={ <CreateEvents /> } />
                    <Route path='/*' element={<Error404 />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
*/
