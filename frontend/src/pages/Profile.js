import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import ProfileCard from '../components/ProfileCard.js';
import { UserDataContext } from '../context/UserDataProvider';
import './Profile.css';

export default function Profile() {
  document.title = 'Profile | RendeYou';
  const { user, updateData } = useContext(UserDataContext);
  useEffect(async () => {
    await updateData();
  }, []);

  return (
    <>
      <div className='content'>
        <div className='profile'>
          <h1 className='profile-center'>Profile Page</h1>
          <ProfileCard user={user} />
        </div>
      </div>
    </>
  );
}
