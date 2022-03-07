import { React } from 'react';
import CreateEvent from '../components/CreateEvent.js';
import '../index.css';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataProvider';
import { useContext, useEffect } from 'react';
import './Events.css';

export default function CreateEvents() {
  document.title = 'Create Event | RendeYou';
  const { updateData } = useContext(UserDataContext);
  useEffect(async () => {
    updateData();
  }, []);
  return (
    <div className='content'>
      <CreateEvent />
    </div>
  );
}
