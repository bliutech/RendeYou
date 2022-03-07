import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';
import EventCard from '../components/EventCard.js';
import backend from '../components/Util.js';

export default function GetUser() {
    let {id} = useParams('');
    document.title = id + '\'s Event | RendeYou';
    let [user, setUser] = useState({});
    async function getUser(id)
    {
        const res = await fetch(backend('/event/' + id), {
            method: 'GET'
        });
        if (res.status >= 400) {
            console.log(res.error);
        }
        else {
            console.log('Page found!');
        }
        const curr_user = await res.json();
        setUser(curr_user);
    }
    useEffect(()=> {
        getUser(id);
    }, []);

    return (
    <>
        <div
        style={{
            position: 'fixed',
            bottom: '300px',
            right: '600px',
            width: '300px',
            border: '3px solid #fc6a01',
            textAlign: 'center',
        }}
        >
        <h1>Event Page</h1>
        {/* { <EventCard user={user} /> } */}
        <p>This is the event page for {id}!</p>
        <Link to='/'>Home</Link>
        </div>
    </>
    );
}
