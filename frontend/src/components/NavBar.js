import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';

export default function NavBar()
{
    return(
        <header className={classes.header}>
                <nav>
                    <ul>
                        <li><Link to='/'> Home </Link></li>
                        <li><Link to='/login'> Login </Link></li>
                        <li><Link to='/register'> Register </Link></li>
                    </ul>
                </nav>
        </header>
    );    
}