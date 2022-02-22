import React from 'react'
import '../index.css'

function Logout() {
  document.title = 'Logout | RendeYou'
  return (
    <div className='content'>
      <h1> Logout </h1>
      <p> Logged out of your RendeYou account. </p>
    </div>
  )
}

export default Logout
