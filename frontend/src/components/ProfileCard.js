import React from 'react';
import classes from './ProfileCard.module.css';

const ProfileCard = (props) => {
  return (
    <div className={classes.contentShape}>
      <img src='https://cdn.iconscout.com/icon/free/png-256/person-1767893-1502146.png' alt='' className={classes.profilePicture}/>
      <table>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{props.user.firstName + ' ' + props.user.lastName}</td>
          </tr>
          <tr>
            <td><strong>Username</strong></td>
            <td>{props.user.username}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>{props.user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileCard;
