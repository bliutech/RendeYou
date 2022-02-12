import React from 'react';
import Links from 'react-router-dom';

export default NavBar()
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