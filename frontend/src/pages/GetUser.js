import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';
import ProfileCard from '../components/ProfileCard.js';
import backend from '../components/Util.js';

export default function GetUser() {
    let { id } = useParams('');
    let [user, setUser] = useState(null);
    async function getUser(id)
    {
        const res = await fetch(backend('/user/' + id), {
            method: 'GET'
        });
        if (res.status >= 400) {
            console.log(res.error);
            return;
        }
        const curr_user = await res.json();
        setUser(curr_user);
    }
    useEffect(()=> {
        getUser(id);
    });
    document.title = ((user !== null) ? (user.username + '\'s Profile | RendeYou') : ('User Not Found | RendeYou'));
    return (
    <>
        <div
        style={{
            position: 'static',
            marginTop: '15%',
            marginLeft: '40%',
            marginRight: '30%',
            width: '300px',
            border: '3px solid #fc6a01',
            textAlign: 'center',
        }}
        >
        <h1>Profile Page</h1>
        {(user !== null) ? <ProfileCard user={user} /> : <p>{id} is not an existing user ID :(</p> }
        <Link to='/'>Home</Link>
        </div>
    </>
    );
}
