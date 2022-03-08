import React from 'react';
import '../index.css';
import FriendsList from '../components/FriendsList';
import AddFriend from '../components/AddFriend';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import './Friends.css';

export default function Friends() {
  document.title = 'Friends | RendeYou';
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  return (
    <div className='content'>
      <div className='friends-left-container'>
        <h1> Your Friends </h1>
        <p> All of your friends on RendeYou! </p>
        <FriendsList />
      </div>
      <div className='friends-right-container'>
        <h1>Add Friends</h1>
        <p> Search for new friends on RendeYou! </p>
        <br/>
        <AddFriend />
      </div>
    </div>
  );
}
