import React from 'react';
import classes from './ProfileCard.module.css';

const ProfileCard = (props) => {
  return (
    <>
      <img
        src='https://cdn.iconscout.com/icon/free/png-256/person-1767893-1502146.png'
        alt=''
        width='100px'
      />
      <p>Name</p>
      <p>{props.user.firstName + ' ' + props.user.lastName}</p>
      <br />
      <p>Email</p>
      <p>{props.user.email}</p>
      <br />
      <p>Username</p>
      <p>{props.user.username}</p>
      <br />
      <p>Friends</p>
      <p>{props.user.friendNames?.join(', ')}</p>
    </>
  );
};

export default ProfileCard;
