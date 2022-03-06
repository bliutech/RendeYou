import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import ProfileCard from '../components/ProfileCard.js';
import { UserDataContext } from '../context/UserDataProvider';

export default function Profile() {
  document.title = 'Profile | RendeYou';
  const { user, updateData } = useContext(UserDataContext);
  useEffect(async () => {
    await updateData();
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '300px',
          right: '600px',
          width: '300px',
          border: '3px solid #fc6a01',
          textAlign: 'center',
        }}
      >
        <h1>Profile Page</h1>
        <ProfileCard user={user} />
        <Link to='/'>Home</Link>
      </div>
    </>
  );
}
