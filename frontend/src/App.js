import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import NavBar from './components/NavBar.js';

function App()
{
    return(
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/login' element={ <Login />} />
                    <Route path='/register' element={ <Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;