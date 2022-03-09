import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import ProfileCard from '../components/ProfileCard.js';
import { getFriend, addUserData, removeFriend } from '../components/Util.js';
import { UserDataContext } from '../context/UserDataProvider';
import './GetUser.css';

export default function GetUser() {
  const { updateData, user } = useContext(UserDataContext);
  let { id } = useParams('');
  let [fetched_user, setUser] = useState(null);
  async function getUser(id) {
    const curr_user = await getFriend(id);
    setUser(curr_user);
  }

  async function handleAddFriend() {
    let f_list = user.friends;
    f_list.push(id);
    const newUser = {
      friends: f_list,
    };
    await addUserData(newUser);
    updateData();
  }

  const deleteFriend = async () => {
    await removeFriend(id);
    await updateData();
  };

  useEffect(() => {
    getUser(id);
    console.log(fetched_user);
  }, []);
  document.title =
    fetched_user !== null
      ? fetched_user.username + "'s Profile | RendeYou"
      : 'User Not Found | RendeYou';
  return (
    <div className='content'>
      <div className='profile'>
        <h1 className='profile-center'>Profile Page</h1>
        {fetched_user !== null ? (
          <ProfileCard user={fetched_user} />
        ) : (
          <p>{id} is not an existing user ID :(</p>
        )}
        {fetched_user !== null && user ? (
          !user.friends.includes(fetched_user.id) ? 
          (<button onClick={async () => handleAddFriend()} className='button'>
            Add Friend
          </button>) : <button onClick={async () => deleteFriend()} className='button'>
            Remove
          </button>
        ) : (
          null
        )}

      </div>
    </div>
  );
}
