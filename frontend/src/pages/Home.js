import React from 'react'
import '../index.css'

function Home() {
  document.title = 'Home | RendeYou'
  return (
    <div className='content'>
      <h1> Welcome to RendeYou! </h1>
      <p> The best website to rendez-vous with your friends! </p>
    </div>
  )
}

export default Home
