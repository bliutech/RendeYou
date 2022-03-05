import { React, useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
import '../index.css';
import { Link } from 'react-router-dom';
import { checkSession, getUserData, getEvent } from '../components/Util';
import EventCard from '../components/EventCard';
import backend from '../components/Util';

export default function Meetings() {
  document.title = 'Meetings | RendeYou';
  const { user, setUser, updateData } = useContext(UserDataContext);
  const [events, setEvents] = useState(Array(0));
  useEffect(async () => {
    updateData();
  }, []);

  useEffect(() => {
    getEvents();
  }, [user]);
  console.log(user);

  const getEvents = async () => {
    let tempEvents = events;
    for (let i = 0; i < user['hostedEvents'].length; i++) {
      const addedEvent = await getEvent(user['hostedEvents'][i]);
      console.log(addedEvent);
      tempEvents = tempEvents.concat(addedEvent);
    }
    console.log(tempEvents);
    setEvents(tempEvents);
  };

  return (
    <div className='content'>
      <h1> Meetings </h1>
      <p> Your RendeYou meetings! </p>
      <h1>Hosted Events </h1>
      <div>
        {events?.length != 0 ? (
          events?.map((e) => {
            return <EventCard event={e} key={e.id} />;
          })
        ) : (
          <p>No Events</p>
        )}
      </div>
      <Link to='/friends'>
        <button>Friends List</button>
      </Link>
    </div>
  );
}
