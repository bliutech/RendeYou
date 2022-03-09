import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getEvent,
  getFriend,
  deleteEvent,
  leaveEvent,
  joinEvent,
} from '../components/Util.js';
import '../index.css';
import EventCardWithoutLink from '../components/EventCardWithoutLink.js';
import backend from '../components/Util.js';
import { UserDataContext } from '../context/UserDataProvider.js';
import './GetEvent.css';

export default function GetEvent() {
  let { id } = useParams('');
  let [event, setEvent] = useState(null);

  const [handler, setHandler] = useState();
  const [handlerName, setHandlerName] = useState();
  const { user, updateData } = useContext(UserDataContext);

  const deleteHandler = async () => {
    deleteEvent(id, updateData);
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
    if (addedEvent) {
      addedEvent.hostUser = host;
    }

    if (user.id === host.id) {
      setEvent(addedEvent);
      setHandler(deleteHandler);
      setHandlerName('Delete');
      return;
    }

    for (let i = 0; i < user.subscriptions; i++) {
      if (user.subscriptions[i] === addedEvent.id) {
        setEvent(addedEvent);
        setHandler(leaveHandler);
        setHandlerName('Leave');
        return;
      }
    }
    setEvent(addedEvent);
    setHandler(joinHandler);
    setHandlerName('Join');
  };

  useEffect(async () => {
    await getEventStuff();
  }, []);
  document.title =
    event !== null
      ? event.id + "'s Event | RendeYou"
      : 'Event Not Found | RendeYou';
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
        {event !== null ? (
          <EventCardWithoutLink
            event={event}
            handler={() => handler}
            handlerName={handlerName}
          />
        ) : (
          <p>{id} is not an existing event ID :(</p>
        )}
      </div>
    </>
  );
}
