import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
import classes from './FriendsList.module.css';
import backend, { getUsersFromIds } from './Util.js';
import { getFriend, removeFriend, addUserData } from './Util.js';
import FriendCard from './FriendCard';
import SuggestedFriendCard from './SuggestedFriendCard';

const SuggestedFriends = () => {
  const [dispList, updateDispList] = useState([]);
  const { user, updateData } = useContext(UserDataContext);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const IDList = user.friends;

    let friends = await getUsersFromIds(IDList);
    let friendsFriends = [];
    for (let i = 0; i < friends.length; i++) {
      let users = await getUsersFromIds(friends[i].friends);
      for (let j = 0; j < users.length; j++) {
        users[j].mutualFriend = [
          friends[i].firstName +
            ' ' +
            friends[i].lastName +
            ' (' +
            friends[i].username +
            ')',
        ];
      }
      friendsFriends = friendsFriends.concat(users);
    }

    console.log(friendsFriends);

    friendsFriends = friendsFriends.filter((f, index) => {
      //Remove duplicates
      for (let i = 0; i < index; i++) {
        if (f.username === friendsFriends[i].username) {
          friendsFriends[i].mutualFriend.push(f.mutualFriend);
          return false;
        }
      }

      if (f.username === user.username) return false;

      for (let i = 0; i < friends.length; i++) {
        if (f.username === friends[i].username) return false;
      }
      return true;
    });

    console.log(friendsFriends);

    if (friendsFriends.length < 4) {
      updateDispList(friendsFriends);
      return;
    }

    let randomFriends = [];
    while (randomFriends.length != 3) {
      let index = Math.floor(Math.random() * friendsFriends.length);
      randomFriends.push(friendsFriends[index]);
      friendsFriends.splice(index, 1);
    }
    setUsers(friendsFriends);
    updateDispList(randomFriends);
    return;
  }, []);

  async function handleAddFriend(id) {
    let f_list = user.friends;
    f_list.push(id);
    const newUser = {
      friends: f_list,
    };
    let index = 0;

    let addedUser = await getFriend(id);
    let userSuggestionList = dispList.filter((e) => {
      return e.username !== addedUser.username;
    });
    await addUserData(newUser);
    updateDispList(userSuggestionList);
    await updateData();
    // let allUsers = users;

    // for (let i = 0; i < allUsers.length; i++) {
    //   if (allUsers[i].username === addedUser.username) {
    //     allUsers.splice(i, 1);
    //     break;
    //   }
    // }

    // if (allUsers.length === 0) {
    //   setUsers(allUsers);
    //   updateDispList(userSuggestionList);
    //   return;
    // }

    // let index2 = Math.floor(Math.random() * allUsers.length);
    // userSuggestionList.push(allUsers[index2]);
    // allUsers.splice(index2, 1);
  }

  return (
    <>
      <h1>Suggested</h1>
      {dispList.map((person) => {
        return (
          <SuggestedFriendCard
            person={person}
            handler={handleAddFriend}
            handlerName={'Add'}
          />
        );
      })}
    </>
  );
};

export default SuggestedFriends;
