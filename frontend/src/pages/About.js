import React from 'react'
import '../index.css'

function About() {
  document.title = 'About | RendeYou'
  return (
    <div className='content'>
      <h1> About RendeYou </h1>
      <p>
        {' '}
        Learn about RendeYou, the best website to rendez-vous with your friends!{' '}
      </p>
    </div>
  )
}

export default About
