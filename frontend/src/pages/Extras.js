import React from 'react';
import '../index.css';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import './Extras.css';

export default function Extras() {
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  document.title = 'Extras | RendeYou';
  return (
    <div className='content'>
      <h1> RendeYou Extras </h1>
      <p>
        {' '}
        Want to enable notifications for RendeYou? Download our Chrome extension! {' '}
      </p>
    </div>
  );
}
