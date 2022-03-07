import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';
import ProfileCard from '../components/ProfileCard.js';
import backend from '../components/Util.js';

export default function GetUser() {
    let { id } = useParams('');
    document.title = id + '\'s Profile | RendeYou';
    let [user, setUser] = useState({});
    async function getUser(id)
    {
        const res = await fetch(backend('/user/' + id), {
            method: 'GET'
        });
        if (res.status >= 400) {
            console.log(res.error);
            return;
        }
        else {
            console.log('Page found!');
        }
        const curr_user = await res.json();
        setUser(curr_user);
    }
    useEffect(()=> {
        getUser(id);
    }, []);

    return (
    <>
        <div
        style={{
            position: 'fixed',
            bottom: '300px',
            right: '600px',
            width: '300px',
            border: '3px solid #fc6a01',
            textAlign: 'center',
        }}
        >
        <h1>Profile Page</h1>
        {/* { <ProfileCard user={user} /> } */}
        <p>This is the profile page for {id}!</p>
        <Link to='/'>Home</Link>
        </div>
    </>
    );
}
