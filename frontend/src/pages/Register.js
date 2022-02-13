import React, { useState } from 'react';
import Form from '../components/Form.js';
import backend from '../components/Util.js';
import '../index.css';

export default function Register()
{
    document.title = 'Register | RendeYou';
    const [err_msg, setErrMsg] = useState("");
    async function handleSubmit(uname, pass) {
        const data = {
            username: uname,
            password: pass
        }
        const res = await fetch(backend("/register"), {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const res_j = await res.json();
        if (res.status >= 400) {
            setErrMsg(res_j.reason);
        } else {
            setErrMsg("");
        }
    }
    console.log(err_msg);
    return (
        <div className='content'>
            <h1> Register </h1>
            <p> Register your RendeYou account. </p>
            <p style={{color: "#ff0000"}}>{err_msg}</p>
            <Form onSubmit={handleSubmit}/>
        </div>
    );
}
