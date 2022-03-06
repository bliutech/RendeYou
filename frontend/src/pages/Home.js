import React from 'react';
import '../index.css';
import { useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
export default function Home() {
  document.title = 'Home | RendeYou';
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  return (
    <div className='content'>
      <h1> Welcome to RendeYou! </h1>
      <p> The best website to rendez-vous with your friends! </p>
    </div>
  );
}
