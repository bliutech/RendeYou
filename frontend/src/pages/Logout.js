import React, { useState } from 'react';
import '../index.css';
import backend from '../components/Util.js';

export default function Logout()
{
    document.title = 'Logout | RendeYou';
    const [err_msg, setErrMsg] = useState("");

    async function handleLogout() {
        const res = await fetch(backend("/logout"), {
            method: "POST",
            credentials: "include"
        });
        const res_j = await res.json();
        // 409 is user not logged in
        // 200 is OK and logged out
        if (res.status >= 400) {
            setErrMsg(res_j.error);
        }
        else {
            setErrMsg("");
        }
    }
    
    return(
        <div className='content' onLoad={handleLogout()}>
            <h1> Logout </h1>
            <p> Logged out of your RendeYou account. </p>
            <p style={{color: "#ff0000"}}>{err_msg}</p>
        </div>
    );
}