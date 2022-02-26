import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.js';
import backend from '../components/Util.js';
import '../index.css';

export default function Register() {
  document.title = 'Register | RendeYou'
  const [err_msg, setErrMsg] = useState('')
  async function handleSubmit(uname, pass) {
    const data = {
      username: uname,
      password: pass,
    }
    const res = await fetch(backend('/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res_j = await res.json()
    if (res.status >= 400) {
      setErrMsg(res_j.error)
    } else {
      setErrMsg('')
    }
  }

  return (
    <div className='content'>
      <h1> Register </h1>
      <p> Register your RendeYou account. </p>
      <RegisterForm onSubmit={handleSubmit} />
      <p>Already have an account? Login <Link to='/login'>here</Link>.</p>
    </div>
  )
}
