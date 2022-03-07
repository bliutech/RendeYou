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
      <p>{props.user.firstName + ' ' + props.user.lastName}</p>
      <br />
      <p>{props.user.email}</p>
      <br />
      <p>{props.user.username}</p>
      <br />
      <p>{props.user.friends.join(' ')}</p>
    </>
  );
};

export default ProfileCard;
