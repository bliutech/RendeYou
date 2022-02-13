import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import Logo from '../files/rende-you-icon.svg';

export default function NavBar()
{
    let isLoggedin = true;
    return(
        <header className={classes.header}>
                <nav>
                    <Link to='/'><img className={classes.logo} src={Logo} alt ="logo" /></Link>
                    <ul>
                        <li><Link to={(isLoggedin ? '/profile' : '/login')}> {(isLoggedin ? "Profile" : "Login")} </Link></li>
                        <li><Link to={(isLoggedin ? '/logout' : '/register')}> {(isLoggedin ? "Logout" : "Register")} </Link></li>
                    </ul>
                </nav>
        </header>
    );    
}