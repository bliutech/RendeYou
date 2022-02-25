import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useCookies } from 'react-cookie'
import Register from './Register'
import mockUser from '../context/mockUser'
import backend from '../components/Util'

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'loggedin'])
  const [err_msg, setErrMsg] = useState('')

  function switchToRegister() {
    return //TODO: implement function so it switches to registration
  }
  async function handleSubmit(uname, pass) {
    const data = {
      username: uname,
      password: pass,
    }
    const res = await fetch(backend('/login'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status >= 400) {
      setErrMsg(res.error)
    } else {
      setErrMsg('')
    }

    const user = await res.json()
    return
  }

  async function handle() {
    setCookie('user', mockUser.id, { path: '/', maxAge: 120 })
    setCookie('loggedin', true, { path: '/', maxAge: 120 })
    console.log('Set user cookie')
  }

  function clearCookies() {
    removeCookie('user')
  }

  document.title = 'Login | RendeYou'
  return (
    <div className='content'>
      <h1> Login </h1>
      <p> Login to your RendeYou account. </p>
      <button onClick={clearCookies}>clear</button>
      <p style={{ color: '#00ff00' }}>{cookies['user']}</p>
      <LoginForm onSubmit={handleSubmit} />
      <p style={{ color: '#ff0000' }}>{err_msg}</p>
      <button onSubmit={switchToRegister}>{Register}</button>
    </div>
  )
}

//TODO: possibly forget login
//TODO: Quality of life (progress wheel, failed login message)

export default Login
