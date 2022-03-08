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
            <Link to={isLoggedin ? '/friends' : '/login'}>
              {' '}
              {isLoggedin ? 'Friends' : 'Login'}{' '}
            </Link>
          </li>
          <li>
            <Link to={isLoggedin ? '/event/new' : '/register'}>
            {' '}
            {isLoggedin ? 'Create +' : 'Register'}{' '}
            </Link>
          </li>
          <li>{' '}<br/></li>{' '}
          <li>{' '}<br/></li>{' '}
          <li>{' '}<br/></li>{' '}
          <li>
            <Link to='/extras'>
            {' '}
            {isLoggedin ? 'Extras' : ' '}{' '}
            </Link>
          </li>
          <li className='list-end'>
            <Link to='/logout'> {isLoggedin ? 'Logout' : null} </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
