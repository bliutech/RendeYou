import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { UserDataContext } from '../context/UserDataProvider';
import '../index.css';
import './Home.css';
import Logo from '../files/rende-you-logo.svg';

export default function Home() {
  document.title = 'Home | RendeYou';

  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);

  return (
    <div className='content home-page'>
        <Link to={!(UserDataContext) ? '/' : '/login'} ><img src={Logo} className="logo-img center vertical-center" /></Link>
        <p className='center'> The best place to rendez-vous with your friends! </p>
    </div>
  );
}
