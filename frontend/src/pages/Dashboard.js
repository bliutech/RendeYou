import EventCard from '../components/EventCard';
import mockEvents from '../context/mockEvents';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';

const Dashboard = (userData) => {
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  return (
    <>
      <div>
        {mockEvents.map((event) => {
          return <EventCard event={event} key={event.id} />;
        })}
      </div>
      <h1>This is Dashboard</h1>
      <Link to='/profile'>Profile</Link>
    </>
  );
};

export default Dashboard;
