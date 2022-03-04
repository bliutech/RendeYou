import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.js';
import backend from '../components/Util.js';
import { UserDataContext } from '../context/UserDataProvider.js';

export default function Login(props) {
  const [err_msg, setErrMsg] = useState('');
  const { setUser, setisLoggedin } = useContext(UserDataContext);
  async function handleSubmit(uname, pass) {
    const data = {
      username: uname,
      password: pass,
    };
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
    } else {
      setErrMsg('');
    }
    const currentUser = await res.json();
    setisLoggedin(true);
    setUser(currentUser);
  }

  document.title = 'Login | RendeYou';
  return (
    <div className='content'>
      <h1> Login </h1>
      <p> Login to your RendeYou account. </p>
      <LoginForm onSubmit={handleSubmit} />
      <p>
        Don't have an account? Register <Link to='/register'>here</Link>.
      </p>
    </div>
  );
}
