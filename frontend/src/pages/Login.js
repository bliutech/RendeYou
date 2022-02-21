import React, { useState } from 'react'
import Form from '../components/Form'
import { useCookies } from 'react-cookie'
import Register from './Register'
import mockUser from '../context/mockUser'

function Login({ updateUserData, updateSignedInStatus }) {
  const [notice, setNotice] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'loggedin']);
  function handleSubmit(uname, pass) {
    if (uname === mockUser.username && pass === mockUser.password) {
      updateUserData(mockUser)
      updateSignedInStatus(true)
      handle();
    }
  }

  async function handle() {
    setCookie('user', mockUser.id, {path: '/', maxAge: 120});
    setCookie('loggedin', true, {path: '/', maxAge: 120});
    console.log("Set user cookie");
  };
  function clearCookies() {
    removeCookie("user");
  }
  const testFunc = () => {setNotice("Hi");};

  document.title = 'Login | RendeYou'
  return (
    <div className='content'>
      <h1> Login </h1>
      <p> Login to your RendeYou account. </p>
      <button onClick={clearCookies}>clear</button>
      <p style={{color: '#00ff00'}}>{cookies["user"]}</p>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

 // TODO: Work with backend peeps to adapt this function to communicate with them
//TODO: Register
//TODO: possibly forget login
//TODO: Quality of life (progress wheel, failed login message)

export default Login
