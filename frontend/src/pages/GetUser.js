import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';
import ProfileCard from '../components/ProfileCard.js';
import backend from '../components/Util.js';
import { getFriend } from '../components/Util.js';
import './GetUser.css';

export default function GetUser() {
  let { id } = useParams('');
  let [user, setUser] = useState(null);
  async function getUser(id) {
    const curr_user = await getFriend(id);
    setUser(curr_user);
  }

  useEffect(() => {
    getUser(id);
    console.log(user);
  }, []);
  document.title =
    user !== null
      ? user.username + "'s Profile | RendeYou"
      : 'User Not Found | RendeYou';
  return (
    <>
      <div
        style={{
          position: 'static',
          marginTop: '15%',
          marginLeft: '40%',
          marginRight: '30%',
          width: '300px',
          border: '3px solid #fc6a01',
          textAlign: 'center',
        }}
      >
        <h1>Profile Page</h1>
        {user !== null ? (
          <ProfileCard user={user} />
        ) : (
          <p>{id} is not an existing user ID :(</p>
        )}
        <Link to='/'>Home</Link>
      </div>
    </>
  );
}
