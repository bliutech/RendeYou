import React, { useState, useEffect, useContext } from 'react';
import classes from './FriendsList.module.css';
import { getUserData, addUserData, searchFriendByName } from './Util';
import backend from './Util.js';
import { UserDataContext } from '../context/UserDataProvider';
import FriendCard from './FriendCard';

const AddFriend = () => {
  // TODO: This force adds friend for both the requester and the target, which should go through a request system
  const [i_uname, updateName] = useState('');
  const { updateData, user } = useContext(UserDataContext);

  //Searching functions
  const [inputString, setInputString] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddFriend(id) {
    // console.log('Submitting request.', uname);
    // if (uname === '') {
    //   alert('Invalid: username is empty.');
    //   return;
    // }
    // // Fetch username from backend
    // const res = await fetch(backend('/user?username=' + uname), {
    //   method: 'GET',
    // });
    // const res_j = await res.json();
    // if (res.status >= 400) {
    //   alert('ERROR: Could not get user.');
    //   return;
    // }
    let f_list = user.friends;
    f_list.push(id);
    const newUser = {
      friends: f_list,
    };
    await addUserData(newUser);
    updateData();
  }
  return (
    <>
      <form>
        <legend>Search by Username</legend>
        <input
          type='text'
          value={inputString}
          placeholder='Search by username'
          onChange={(name) => {
            setInputString(name.target.value);
          }}
          onKeyUp={(e) =>
            searchFriendByName(e.target.value, setResults, setLoading)
          }
        />
        <input type='submit' value='Submit' />
      </form>
      <div>
        {results && results.length
          ? results.map((person) => {
              return !user.friends.includes(person.id) ? (
                <FriendCard
                  person={person}
                  handler={handleAddFriend}
                  handlerName={'Add Friend'}
                />
              ) : (
                ''
              );
            })
          : ' '}
      </div>
    </>
  );
};

export default AddFriend;
