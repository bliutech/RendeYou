import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.js';
import backend from '../components/Util.js';
import { UserDataContext } from '../context/UserDataProvider.js';
import BackDrop from '../files/rendez-vous.jpg';
import './Login.css'

export default function Login(props) {
  const [err_msg, setErrMsg] = useState('');
  const { setUser, setisLoggedin } = useContext(UserDataContext);
  async function handleSubmit(uname, pass) {
    const data = {
      username: uname,
      password: pass,
    };
    if(uname === '' || pass === '')
    {
      alert('Fields are empty');
      return;
    }
    const res = await fetch(backend('/login'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status >= 400) {
      setErrMsg(res.error);
      alert('Incorrect username or password!');
      return;
    } else {
      setErrMsg('');
    }
    const currentUser = await res.json();
    setisLoggedin(true);
    setUser(currentUser);
  }

  document.title = 'Login | RendeYou';
  return (
    <div className='this-content'>
      <img src={BackDrop} className='this-backdrop'/>
      <div className='this-form'>
        <h1 className='center'> Login </h1>
        <p> Login to your RendeYou account. </p>
        <LoginForm onSubmit={handleSubmit}/>
        <p>
          Don't have an account? Register <Link to='/register' className='login-a'>here</Link>.
        </p>
      </div>
    </div>
  );
}
