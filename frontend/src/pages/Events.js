import React from 'react';
import CreateEvent from '../components/CreateEvent.js';
import '../index.css';

export default function Events()
{
    document.title = 'Create Event | RendeYou';
    return(
        <div className='content'>
            <CreateEvent />
        </div>
    );
}