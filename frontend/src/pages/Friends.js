import React from 'react';
import '../index.css';
import FriendsList from '../components/FriendsList';
import AddFriend from '../components/AddFriend';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import classes from '../components/FriendsList.module.css'
import './Friends.css';

export default function Friends() {
  document.title = 'Friends | RendeYou';
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  return (
    <div className='content'>
      <h1> Your Friends </h1>
      <p> All of your friends on RendeYou! </p>
      <div className={classes.pagesplit}>
        <div>
          <FriendsList />
        </div>
        <div>
          <AddFriend />
        </div>
      </div>
    </div>
  );
}
