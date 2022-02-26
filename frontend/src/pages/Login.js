import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../components/LoginForm.js';
import backend from '../components/Util.js';

export default function Login() {
  const [err_msg, setErrMsg] = useState('');
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
    }
    else {
      setErrMsg('');
    }

    const user = await res.json();
    return;
  }

  document.title = 'Login | RendeYou';
  return (
    <div className='content'>
      <h1> Login </h1>
      <p> Login to your RendeYou account. </p>
      <LoginForm onSubmit={handleSubmit}/>
      <p>Don't have an account? Register <Link to='/register'>here</Link>.</p>
    </div>
  )
}
