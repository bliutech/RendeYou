import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

function App()
{
    return(
        <div>
            <BrowserRouter>
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