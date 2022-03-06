import React, { useState, useEffect, useContext } from 'react';
import '../index.css';
import backend from '../components/Util.js';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataProvider';

export default function Logout() {
  document.title = 'Logout | RendeYou';
  let navigate = useNavigate();
  const { updateData } = useContext(UserDataContext);

  useEffect(async () => {
    const res = await fetch(backend('/logout'), {
      method: 'POST',
      credentials: 'include',
    });
    // 409 is user not logged in
    // 200 is OK and logged out
    // maybe add back body for error response
    updateData();
    navigate('/login');
  });

  return (
    <div className='content'>
      <h1> Logout </h1>
      <p> Logged out of your RendeYou account. </p>
    </div>
  );
}
