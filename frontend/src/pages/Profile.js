import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import ProfileCard from '../components/ProfileCard.js';

export default function Profile() {
  document.title = 'Profile | RendeYou';
  return (
    <>
      <h1>Profile Page</h1>
      <ProfileCard/>
      <Link to='/'>Home</Link>
    </>
  )
}
