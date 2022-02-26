import React from 'react';

const ProfileCard = (user) => {
  return (
    <>
      <img src={user.picture} alt='' width='100px' />
      <p>{user.firstName + ' ' + user.lastName}</p>
      <br />
      <p>{user.email}</p>
      <br />
      <p>{user.username}</p>
      <br />
      <p>{user.friends.join(' ')}</p>
    </>
  );
}

export default ProfileCard;
