import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.js';
import backend from '../components/Util.js';
import { UserDataContext } from '../context/UserDataProvider.js';
import { addUserData, getUserData } from '../components/Util.js';
import '../index.css';

export default function Register() {
  document.title = 'Register | RendeYou';
  const { updateData } = useContext(UserDataContext);
  const [err_msg, setErrMsg] = useState('');

  async function handleSubmit(uname, pass, firstName, lastName, email) {
    const data = {
      username: uname,
      password: pass,
    };

    const otherData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      friends: [],
    };

    const res = await fetch(backend('/register'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const user = Object.assign({}, await res.json(), otherData);

    addUserData(user);
    updateData();
  }

  return (
    <div className='content'>
      <h1> Register </h1>
      <p> Register your RendeYou account. </p>
      <RegisterForm onSubmit={handleSubmit} />
      <p>
        Already have an account? Login <Link to='/login'>here</Link>.
      </p>
    </div>
  );
}
