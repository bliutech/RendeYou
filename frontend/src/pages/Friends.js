import React from 'react';
import '../index.css';
import FriendsList from '../components/FriendsList';
import AddFriend from '../components/AddFriend';
import SuggestedFriends from '../components/SuggestedFriends';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import classes from '../components/FriendsList.module.css';
import './Friends.css';

function entered(event) {
  event.target.closest('.friends-window').classList.add('expanded');
  event.target.closest('.friends-right-container').classList.add('hovered');
}

function left(event) {
  event.target.closest('.friends-window').classList.remove('expanded');
  event.target.closest('.friends-right-container').classList.remove('hovered');
}

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
        <br />
        <FriendsList />
      </div>
      <div className='friends-right-container'>
        <h1>Add Friends</h1>
        <div
          className='friends-window search-friends'
          onMouseEnter={entered}
          onMouseLeave={left}
        >
          <AddFriend />
        </div>
        <h1>Suggested</h1>
        <div
          className='friends-window suggested-friends'
          onMouseEnter={entered}
          onMouseLeave={left}
        >
          <SuggestedFriends />
        </div>
      </div>
    </div>
  );
}
