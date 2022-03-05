import React from 'react';
import '../index.css';
import FriendsList from '../components/FriendsList';
import AddFriend from '../components/AddFriend';

export default function Friends()
{
    document.title = 'Friends | RendeYou';
    return(
        <div className='content'>
            <h1> Your Friends </h1>
            <p> All of your friends on RendeYou! </p>
            <FriendsList />
            <AddFriend />
        </div>
    );
}