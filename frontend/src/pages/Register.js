import React from 'react';
import Form from '../components/Form.js';
import backend from '../components/Util.js';
import '../index.css';

export default function Login()
{

    function handleSubmit(uname, pass) {
        // Temp implementation: logs the output of uname and pass
        const data = {
            username: uname,
            password: pass
        }
        fetch(backend("/register"), {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    return (
        <div className='content'>
            <h1> Register </h1>
            <p> Register your RendeYou account. </p>
            <Form onSubmit={handleSubmit}/>
        </div>
    );
}
