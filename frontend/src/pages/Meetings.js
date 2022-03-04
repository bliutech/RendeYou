import { React, useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserDataProvider';
import '../index.css';
import { Link } from 'react-router-dom';
import { checkSession } from '../components/Util';

export default function Meetings() {
  document.title = 'Meetings | RendeYou';
  const { user, setUser } = useContext(UserDataContext);
  useEffect(() => {
    checkSession();
  });
  console.log(user);
  return (
    <div className='content'>
      <h1> Meetings </h1>
      <p> Your RendeYou meetings! </p>
      <Link to='/friends'>
        <button>Friends List</button>
      </Link>
    </div>
  );
}
