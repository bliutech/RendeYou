import React from 'react';
import '../index.css';

export default function Profile()
{
    document.title = 'Profile | RendeYou';
    return(
        <div className='content'>
            <h1> Profile </h1>
            <p> Your RendeYou profile. </p>
        </div>
    );
}