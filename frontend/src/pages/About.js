import React from 'react';
import '../index.css';
import {Link} from 'react-router-dom';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import Logo from '../files/rende-you-logo.svg'
import './About.css';

export default function About() {
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  document.title = 'About | RendeYou';
  return (
    <div className='about-content'>
      <h1 className='about-center'> About RendeYou </h1>
      <img src={Logo} alt='RendeYou logo'/>
      <p> Learn about RendeYou, the best website to rendez-vous with your friends! </p>
      <h2> What is RendeYou? </h2>
      <p> RendeYou is a social media application focusing on connecting user for instant meet ups!</p>
      <h2> Who developed RendeYou? </h2>
      <p> RendeYou was developed by the Freshly Poached team! You can see your source code at <a href='https://github.com/bliutech/RendeYou' className='about-a'>link</a>.</p>
      <h2> How can I start using RendeYou? </h2>
      <p><Link to='/register'>Register</Link> today to start using RendeYou! </p>
    </div>
  );
}
