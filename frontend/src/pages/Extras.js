import React from 'react';
import '../index.css';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import './Extras.css';
import ZipFile from '../files/RendeYourEvents.zip';

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
      <p>Download RendeYour Events <a href={ZipFile} className='this-a'>here</a>.</p>
    </div>
  );
}
