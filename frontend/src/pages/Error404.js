import React from 'react';
import {Link} from 'react-router-dom';
import '../index.css';

export default function Error404()
{
    document.title = '404 | RendeYou';
    return(
        <div className='content'>
            <h1> 404: Page Not Found </h1>
            <p> The page you are looking for does not exist. Please return back to the main <Link to='/'>content</Link>. </p>
        </div>
    );
}