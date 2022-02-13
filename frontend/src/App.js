import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Logout from './pages/Logout.js';
import Profile from './pages/Profile.js';
import Meetings from './pages/Meetings.js';
import Error404 from './pages/Error404.js';
import NavBar from './components/NavBar.js';

function App()
{
    let isLoggedin = false;
    return(
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={ (isLoggedin ? <Meetings /> : <Home />) } />
                    <Route path='/home' element={<Home />} />
                    <Route path='/meetings' element={ (isLoggedin ? <Home /> : <Meetings />)}/>
                    <Route path='/login' element={ <Login />} />
                    <Route path='/register' element={ <Register />} />
                    <Route path='/logout' element={ <Logout /> } />
                    <Route path='/profile' element={ <Profile /> } />
                    <Route path='/*' element={<Error404 />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;