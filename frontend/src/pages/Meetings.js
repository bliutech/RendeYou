import { React, useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
import '../index.css';
import { Link } from 'react-router-dom';
import { getEvent, getUsers } from '../components/Util';
import EventCard from '../components/EventCard';
import {
  deleteEvent,
  getFriend,
  joinEvent,
  leaveEvent,
} from '../components/Util';
import './Meetings.css';

export default function Meetings() {
  document.title = 'Meetings | RendeYou';
  const { user, setUser, updateData } = useContext(UserDataContext);
  const [hostedEvents, setHostedEvents] = useState(Array(0));
  const [friendEvents, setFriendEvents] = useState(Array(0));

  const [joinedEvents, setJoinedEvents] = useState(Array(0));

  useEffect(async () => {
    await updateData();
  }, []);

  useEffect(() => {
    if (user) {
      getFriendEvents();
      getHostedEvents();
      getJoinedEvents();
    }
  }, [user]);

  const getHostedEvents = async () => {
    let tempEvents = [];
    for (let i = user['hostedEvents'].length - 1; i >= 0; i--) {
      let addedEvent = await getEvent(user['hostedEvents'][i]);
      addedEvent.hostUser = user;
      tempEvents = tempEvents.concat(addedEvent);
    }
    setHostedEvents(tempEvents);
  };

  const getFriendEvents = async () => {
    const ids = user.friends;
    let friends = [];
    for (let i = 0; i < ids.length; i++) {
      friends.push(await getFriend(ids[i]));
    }
    let events = [];
    for (let i = 0; i < friends.length; i++) {
      if (friends[i]) {
        for (let j = 0; j < friends[i].hostedEvents.length; j++) {
          if (user.subscriptions.indexOf(friends[i].hostedEvents[j]) == -1) {
            let addedEvent = await getEvent(friends[i].hostedEvents[j]);
            addedEvent.hostUser = friends[i];
            events.push(addedEvent);
          }
        }
      }
    }
    setFriendEvents(events);
  };

  const getJoinedEvents = async () => {
    const ids = user.subscriptions;
    let events = [];
    for (let i = 0; i < ids.length; i++) {
      let addedEvent = await getEvent(ids[i]);
      let host = await getFriend(addedEvent.host);
      if (addedEvent) {
        addedEvent.hostUser = host;
        events.push(addedEvent);
      }
    }
    console.log(events);
    setJoinedEvents(events);
  };

  const deleteHandler = async (id) => {
    deleteEvent(id, updateData);
  };

  const joinHandler = async (id) => {
    joinEvent(id, updateData);
  };

  const leaveHandler = async (id) => {
    leaveEvent(id, updateData);
  };

  return (
    <div className='content'>
      <h1> Meetings </h1>
      <p> Your RendeYou meetings! </p>
      <h1>Hosted Events </h1>
      <div>
        {hostedEvents?.length != 0 ? (
          hostedEvents?.map((e) => {
            return (
              <EventCard
                event={e}
                handler={deleteHandler}
                handlerName={'Delete'}
              />
            );
          })
        ) : (
          <p>No Events</p>
        )}
      </div>
      <h1>Friend Events</h1>
      <div>
        {friendEvents.length != 0 ? (
          friendEvents.map((e) => {
            return (
              <EventCard event={e} handler={joinHandler} handlerName={'Join'} />
            );
          })
        ) : (
          <p>No Events</p>
        )}
      </div>
      <h1>Joined Events</h1>
      <div>
        {joinedEvents.length != 0 ? (
          joinedEvents.map((e) => {
            return (
              <EventCard
                event={e}
                handler={leaveHandler}
                handlerName={'Leave'}
              />
            );
          })
        ) : (
          <p>Join some events!</p>
        )}
      </div>
      <div></div>
      <Link to='/friends'>
        <button>Friends List</button>
      </Link>
    </div>
  );
}
