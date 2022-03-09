import React, { useState, useEffect, useContext } from 'react';
import { getUserData, addUserData, searchFriendByName } from './Util';
import backend from './Util.js';
import { UserDataContext } from '../context/UserDataProvider';
import FriendCard from './FriendCard';
import classes from './AddFriend.module.css';

const AddFriend = () => {
  // TODO: This force adds friend for both the requester and the target, which should go through a request system
  const [i_uname, updateName] = useState('');
  const { updateData, user } = useContext(UserDataContext);

  //Searching functions
  const [inputString, setInputString] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddFriend(id) {
    let f_list = user.friends;
    f_list.push(id);
    const newUser = {
      friends: f_list,
    };
    await addUserData(newUser);
    updateData();
  }
  
  return (
    <div>
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
            searchFriendByName(e.target.value, setResults, setLoading, user)
          }
        />
      </form>
      <div className={classes.newFriends}>
        {(inputString !== '') ? (results && results.length
          ? results.map((person) => {
              return !user.friends.includes(person.id) ? (
                <FriendCard
                  person={person}
                  handler={handleAddFriend}
                  handlerName={'Add Friend'}
                  className={classes.friendCard}
                />
              ) : (
                <p>You already follow {person.firstName} {person.lastName} ({person.username}).</p>
              );
            })
          : 'No user matches that search.') : ' '}
      </div>
    </div>
  );
};

export default AddFriend;
