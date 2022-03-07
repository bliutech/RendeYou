import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';
import EventCard from '../components/EventCard.js';
import backend from '../components/Util.js';

export default function GetEvent() {
    let { id } = useParams('');
    let [event, setEvent] = useState(null);
    async function getEvent(id)
    {
        const res = await fetch(backend('/event/' + id), {
            method: 'GET'
        });
        if (res.status >= 400) {
            console.log(res.error);
            return;
        }
        const curr_event = await res.json();
        setEvent(curr_event);
    }
    useEffect(()=> {
        getEvent(id);
    });
    document.title = ((event !== null) ? (event.id + '\'s Event | RendeYou') : ('Event Not Found | RendeYou'));
    return (
    <>
        <div
        style={{
            position: 'static',
            marginTop: '15%',
            marginLeft: '40%',
            marginRight: '30%',
            width: '300px',
            border: '3px solid #fc6a01',
            textAlign: 'center',
        }}
        >
        <h1>Event Page</h1>
        {(event !== null) ? <EventCard event={event} /> : <p>{id} is not an existing event ID :(</p> }
        <Link to='/'>Home</Link>
        </div>
    </>
    );
}
