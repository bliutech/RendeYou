import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar()
{
    return(
        <div>
            <ul>
                <li><Link to='/' > Home </Link></li>
                <li><Link to='/login'> Login </Link></li>
                <li><Link to='/register'> Register </Link></li>
            </ul>
        </div>
    );    
}