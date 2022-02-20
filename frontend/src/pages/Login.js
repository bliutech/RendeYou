import React from 'react'
import Form from '../components/Form'
import Register from './Register'

function Login() {
  document.title = 'Login | RendeYou'
  return (
    <div className='content'>
      <h1> Login </h1>
      <p> Login to your RendeYou account. </p>
      <Form />
    </div>
  )
}

export default Login
