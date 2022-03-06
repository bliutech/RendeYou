import React from 'react';
import '../index.css';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';

export default function About() {
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  document.title = 'About | RendeYou';
  return (
    <div className='content'>
      <h1> About RendeYou </h1>
      <p>
        {' '}
        Learn about RendeYou, the best website to rendez-vous with your friends!{' '}
      </p>
    </div>
  );
}
