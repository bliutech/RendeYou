import React,  {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import Logo from '../files/rende-you-icon.svg';
import PlusSign from '../files/plus-sign.png';
import checkSession from './Util.js';

export default function NavBar()
{
    let [isLoggedin, setsLoggedin] = useState(false);
    useEffect(()=> 
    {
        setsLoggedin(checkSession());
    });

    return(
        <header className={classes.header}>
                <nav className={classes.nav}>
                    <Link to='/' className={classes.logo}><img className={classes.logo} src={Logo} alt ="logo" /></Link>
                    <ul>
                        <li><Link to={(isLoggedin ? '/profile' : '/login')}> {(isLoggedin ? "Profile" : "Login")} </Link></li>
                        <li><Link to={(isLoggedin ? '/logout' : '/register')}> {(isLoggedin ? "Logout" : "Register")} </Link></li>
                    </ul>
                    {(isLoggedin ? <img onClick={()=>alert('it works!')} className={classes.addImage} src={PlusSign} alt="add event"/> : null)}
                </nav>
        </header>
    );    
}