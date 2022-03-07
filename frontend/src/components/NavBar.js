import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import Logo from '../files/rende-you-icon.svg';
import PlusSign from '../files/plus-sign.png';
import { UserDataContext } from '../context/UserDataProvider';

export default function NavBar() {
  const { isLoggedin } = useContext(UserDataContext);
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to='/' className={classes.logo}>
          {' '}
          <img className={classes.logo} src={Logo} alt='logo' />{' '}
        </Link>
        <ul>
          <li>
            <Link to={isLoggedin ? '/profile' : '/about'}>
              {' '}
              {isLoggedin ? 'Profile' : 'About'}{' '}
            </Link>
          </li>
          <li>
            <Link to={isLoggedin ? '/event/new' : '/login'}>
              {' '}
              {isLoggedin ? 'Event +' : 'Login'}{' '}
            </Link>
          </li>
          <li>
            <Link to={isLoggedin ? '/friends' : '/register'}>
            {' '}
            {isLoggedin ? 'Friends' : 'Register'}{' '}
            </Link>
          </li>
          <li>{' '}<br/></li>{' '}
          <li>{' '}<br/></li>{' '}
          <li>{' '}<br/></li>{' '}
          <li>{' '}<br/></li>{' '}
          <li className='list-end'>
            <Link to='/logout'> {isLoggedin ? 'Logout' : null} </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
/*This is your original version of the code. Feel free to delete mine if you want to do it differently. 
I needed to change it for testing purposes.*/
/*
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
                        <li><Link to='/event/new'> {(isLoggedin ? "Create Event" : null)} </Link></li>
                    </ul>
                    {(isLoggedin ? <img onClick={()=>alert('it works!')} className={classes.addImage} src={PlusSign} alt="add event"/> : null)}
                </nav>
        </header>
    );    
}
*/
