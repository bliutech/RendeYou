import { React } from 'react';
import CreateEvent from '../components/CreateEvent.js';
import '../index.css';
import { Link } from 'react-router-dom';

export default function CreateEvents() {
  document.title = 'Create Event | RendeYou';

  return (
    <div className='content'>
      <CreateEvent />
    </div>
  );
}
