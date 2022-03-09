import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getEvent, getFriend, deleteEvent, leaveEvent, joinEvent, getUserData } from '../components/Util.js';
import EventCardWithoutLink from '../components/EventCardWithoutLink.js';
import { UserDataContext } from '../context/UserDataProvider.js';
import './GetEvent.css';
import '../index.css';

export default function GetEvent() {
  let { id } = useParams('');
  let [event, setEvent] = useState(null);
  let navigate = useNavigate();

  const { updateData, user } = useContext(UserDataContext);

  const deleteHandler = async () => {
    deleteEvent(id, updateData);
    navigate('/');
  };

  const joinHandler = async () => {
    joinEvent(id, updateData);
  };

  const leaveHandler = async () => {
    leaveEvent(id, updateData);
  };

  const getEventStuff = async () => {
    let addedEvent = await getEvent(id);
    let host = await getFriend(addedEvent.host);
    let user = await getUserData();
    if (addedEvent) {
      addedEvent.hostUser = host;
    }
    setEvent(addedEvent);
  };

  useEffect(async () => {
    await getEventStuff();
  }, []);

  document.title = (event !== null ? event.title + " | RendeYou" : 'Event Not Found | RendeYou');
  
  return (
    <>
      <div className='event-content'>
        {event !== null ? (
          <EventCardWithoutLink event={event}/>
        ) : (
          <p>{id} is not an existing event ID :(</p>
        )}

        {event !== null && user ? ((user.hostedEvents.includes(event.id) ?  <button onClick={async () => deleteHandler()} className='button'> Delete </button> : (!user.subscriptions.includes(event.id) ? <button onClick={async () => joinHandler()} className='button'> Join </button> : <button onClick={async () => leaveHandler()} className='button'> Leave </button>)))
            : null}
      </div>
    </>
  );
}
