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
      <p>Enjoy a portable, simplistic list of all your events just a click away!</p>
      <p>Instructions: Open chrome and navigate to `chrome://extensions`. Turn on developer mode at the top right of the screen, and click on Load Unpacked in the toolbar that should have just displayed. Navigate to the unzipped file and select the dist folder to load into Chrome.</p>
    </div>
  );
}
