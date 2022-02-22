import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

function Profile(user) {
  document.title = 'Profile | RendeYou'
  return (
    <>
      <img src={user.info.picture} alt='' width='100px' />
      <p>{user.info.firstName + ' ' + user.info.lastName}</p>
      <br />
      <p>{user.info.email}</p>
      <br />
      <p>{user.info.username}</p>
      <br />
      <p>{user.info.friends.join(' ')}</p>
      <Link to='/'>
        <button>Dashboard</button>
      </Link>
    </>
  )
}

export default Profile
