import React, { useState, useEffect, useContext } from 'react';
import classes from './FriendsList.module.css';
import { getUserData, addUserData } from './Util';
import backend from './Util.js';
import { UserDataContext } from '../context/UserDataProvider';

const AddFriend = () => {
  // TODO: This force adds friend for both the requester and the target, which should go through a request system
  const [i_uname, updateName] = useState('');

  const { updateData, user } = useContext(UserDataContext);
  async function handleSubmit(uname) {
    console.log('Submitting request.', uname);
    if (uname === '') {
      alert('Invalid: username is empty.');
      return;
    }
    // Fetch username from backend
    const res = await fetch(backend('/user?username=' + uname), {
      method: 'GET',
    });
    const res_j = await res.json();
    if (res.status >= 400) {
      alert('ERROR: Could not get user.');
      return;
    }
    const test_j = res_j[0];
    let f_list = user.friends;
    f_list.push(test_j.id);
    console.log(f_list);
    const newUser = {
      friends: f_list,
    };
    await addUserData(newUser);
    updateData();
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(i_uname);
      }}
    >
      <legend>Username</legend>
      <input
        type='text'
        value={i_uname}
        onChange={(name) => {
          updateName(name.target.value);
        }}
        placeholder='Enter Username'
      />
      <br />
      <input type='submit' value='Submit' />
    </form>
  );
};

export default AddFriend;
