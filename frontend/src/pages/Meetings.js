import { React, useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
import '../index.css';
import { Link } from 'react-router-dom';
import { getEvent, getUsers } from '../components/Util';
import EventCard from '../components/EventCard';
import HostEventCard from '../components/HostEventCard';
import backend from '../components/Util';
import { deleteEvent } from '../components/Util';

export default function Meetings() {
  document.title = 'Meetings | RendeYou';
  const { user, setUser, updateData } = useContext(UserDataContext);
  const [hostedEvents, setHostedEvents] = useState(Array(0));
  const [friendEvents, setFriendEvents] = useState(Array(0));
  useEffect(async () => {
    await updateData();
  }, []);

  useEffect(() => {
    getFriendEvents();
    getHostedEvents();
  }, [user]);
  console.log(user);

  const getHostedEvents = async () => {
    let tempEvents = [];
    for (let i = user['hostedEvents'].length - 1; i >= 0; i--) {
      const addedEvent = await getEvent(user['hostedEvents'][i]);
      tempEvents = tempEvents.concat(addedEvent);
    }
    console.log(tempEvents);
    setHostedEvents(tempEvents);
  };

  const getFriendEvents = async () => {
    const ids = user.friends;
    const friends = await getUsers(ids);
    console.log(friends);
  };

  const deleteHandler = async (id) => {
    deleteEvent(id, updateData);
  };

  return (
    <div className='content'>
      <h1> Meetings </h1>
      <p> Your RendeYou meetings! </p>
      <h1>Hosted Events </h1>
      <div>
        {hostedEvents?.length != 0 ? (
          hostedEvents?.map((e) => {
            return <HostEventCard event={e} deleteHandler={deleteHandler} />;
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
