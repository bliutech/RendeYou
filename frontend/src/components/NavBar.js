import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NavBar.module.css'
import Logo from '../files/rende-you-icon.svg'
import PlusSign from '../files/plus-sign.png'

function NavBar() {
  let isLoggedin = false
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to='/'>
          <img className={classes.logo} src={Logo} alt='logo' />
        </Link>
        <ul>
          <li>
            <Link to={isLoggedin ? '/profile' : '/login'}>
              {' '}
              {isLoggedin ? 'Profile' : 'Login'}{' '}
            </Link>
          </li>
          <li>
            <Link to={isLoggedin ? '/logout' : '/register'}>
              {' '}
              {isLoggedin ? 'Logout' : 'Register'}{' '}
            </Link>
          </li>
        </ul>
        {isLoggedin ? (
          <img
            onClick={() => alert('it works!')}
            className={classes.addImage}
            src={PlusSign}
            alt='add event'
          />
        ) : (
          <p />
        )}
      </nav>
    </header>
  )
}

export default NavBar
