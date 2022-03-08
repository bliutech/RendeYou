import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.js';
import backend, { emailRegex } from '../components/Util.js';
import { UserDataContext } from '../context/UserDataProvider.js';
import { addUserData, getUserData } from '../components/Util.js';
import '../index.css';
import BackDrop from '../files/rendez-vous-2.jpg';
import './Register.css';

export default function Register() {
  document.title = 'Register | RendeYou';
  const { updateData } = useContext(UserDataContext);
  const [err_msg, setErrMsg] = useState('');

  async function handleSubmit(uname, pass, firstName, lastName, email) {
    const data = {
      username: uname,
      password: pass,
    };
    if (firstName === '' || lastName === '' || email === '') {
      alert('Fields are empty');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Enter Valid Email');
      return;
    }
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
    if (user.error) {
      alert(user.error);
      return;
    }
    addUserData(user);
    updateData();
  }

  return (
    <div className='content'>
      <img src={BackDrop} className='backdrop' />
      <div className='form'>
        <h1 className='center'> Register </h1>
        <p> Register your RendeYou account. </p>
        <RegisterForm onSubmit={handleSubmit} />
        <p>
          Already have an account? Login <Link to='/login'>here</Link>.
        </p>
      </div>
    </div>
  );
}
