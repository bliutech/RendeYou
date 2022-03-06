import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
import classes from './FriendsList.module.css';
import backend from './Util.js';
import { getFriend, removeFriend } from './Util.js';

const FriendsList = () => {
  const [dispList, updateDispList] = useState([]);
  const { user, updateData } = useContext(UserDataContext);

  //  TODO: Test linking with backend by uncommenting the below code block
  useEffect(async () => {
    const res = await fetch(backend('/user/me'), {
      credentials: 'include',
    });
    const res_j = await res.json();
    const IDList = res_j.friends;
    let str = IDList.join();
    console.log('Getting frineds...');
    if (str.length === 0) {
      console.log('No beaches?');
      updateDispList([]);
      return;
    }

    //TODO: change this to user instead of user/[id] implementation when we figure it out
    //I added this portion to make testing easier
    console.log(str);
    let friends = [];
    for (let i = 0; i < IDList.length; i++) {
      friends.push(await getFriend(IDList[i]));
    }
    console.log('Display list:', friends);
    updateDispList(friends);
  }, [user]);

  const deleteFriend = async (id) => {
    await removeFriend(id);
    await updateData();
  };

  if (dispList.length === 0) return <p>Damn you have no Friends</p>;

  return (
    <>
      {dispList.map((person) => {
        return (
          <tr>
            <td>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src='https://reactnative.dev/img/tiny_logo.png'
                  alt='React Native Logo'
                />
                <div>
                  <p className={classes.largebody}>
                    {person.firstName} {person.lastName}
                  </p>
                  <p className={classes.bodytext}>{person.email}</p>
                  <button onClick={async () => deleteFriend(person.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default FriendsList;
