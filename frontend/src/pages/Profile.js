import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import ProfileCard from '../components/ProfileCard'

function Profile(props) {
  document.title = 'Profile | RendeYou'
  return (
    <>
      <h1>Profile Page</h1>
      <ProfileCard userinfo={props.info} />
      <Link to='/'>
        <button>Dashboard</button>
      </Link>
    </>
  )
}

export default Profile
