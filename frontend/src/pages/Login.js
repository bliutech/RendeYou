import React from 'react'
import Form from '../components/Form'
import Register from './Register'
import mockUser from '../context/mockUser'

function Login({ updateUserData, updateSignedInStatus }) {
  function handleSubmit(uname, pass) {
    if (uname === mockUser.username && pass === mockUser.password) {
      updateUserData(mockUser)
      updateSignedInStatus(true)
    }
  }

  document.title = 'Login | RendeYou'
  return (
    <div className='content'>
      <h1> Login </h1>
      <p> Login to your RendeYou account. </p>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

 // TODO: Work with backend peeps to adapt this function to communicate with them
//TODO: Register
//TODO: possibly forget login
//TODO: Quality of life (progress wheel, failed login message)

export default Login
