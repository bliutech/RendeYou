import React from 'react';
import Form from '../components/Form.js';
import '../index.css';

export default function Login()
{

    function handleSubmit(uname, pass) {
        // Temp implementation: logs the output of uname and pass
        console.log(uname);
        console.log(pass);
    }

    return(
        <div className='content'>
            <h1> Register </h1>
            <p> Register your RendeYou account. </p>
            <Form onSubmit={handleSubmit}/>
        </div>
    );
}
