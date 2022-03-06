import React, { useContext, useState } from 'react';
import backend, { checkSession, formatDate } from './Util.js';
import { getUserData } from './Util.js';
import './CreateEvent.module.css';
import { UserDataContext } from '../context/UserDataProvider.js';

export default function CreateEvent() {
  let [title, setTitle] = useState('');
  let [date, setDate] = useState(Date.now());
  let [description, setDescription] = useState('');
  let [time, setTime] = useState();
  const { updateData } = useContext(UserDataContext);
  const [err_msg, setErrMsg] = useState('');
  async function handleSubmit() {
    const data = {
      title: title,
      date: date,
      description: description,
    };
    const res = await fetch(backend('/event/new'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await updateData();
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1> Create Event </h1>
        <p> Event Name: </p>
        <input
          type='text'
          value={title}
          onChange={(a) => setTitle(a.target.value)}
          placeholder='Event Name'
        />
        <p> Date: </p>
        <input
          type='date'
          value={formatDate(Date(date).toString())}
          onChange={(a) =>
            setDate(Date.parse(formatDate(Date(a.target.value).toString())))
          }
        />
        <p> Description: </p>
        <textarea
          type='text'
          value={description}
          onChange={(a) => setDescription(a.target.value)}
          placeholder='Event Description'
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

/*
This is your original version of the code. Feel free to delete mine if you want to do it differently. 
I needed to change it for testing purposes.
 */
// import React, {useState} from 'react';
// import backend, {formatDate} from './Util.js';
// import './CreateEvent.module.css';

// export default function CreateEvent(){
//     let [name, setName] = useState('');
//     let [date, setDate] = useState(Date.now());
//     let [description, setDescription] = useState('');

//     const [err_msg, setErrMsg] = useState("");

//     async function handleSubmit() {
//         const data = {
//             name: name,
//             date: date,
//             description: description
//         }
//         const res = await fetch(backend("/event/new"), {
//             method: "POST",
//             credentials: "include",
//             headers: {
//             "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
//         const res_j = await res.json();
//         if (res.status >= 400) {
//             setErrMsg(res_j.error);
//             alert('ERROR: Could not create event! \nReason', err_msg);
//         } else {
//             setErrMsg("");
//             alert('Event created!');
//         }
//     }

//     return(
//         <div>
//             <h1> Create Event </h1>
//             <p> Event Name: </p>
//             <input type='text' value={name} onChange={(a) => setName(a.target.value)} placeholder='Event Name' />
//             <p> Date: </p>
//             <input type='date' value={formatDate(Date(date).toString())} onChange={(a) => setDate(Date.parse(formatDate(Date(a.target.value).toString())))} />
//             <p> Description: </p>
//             <textarea type='text' value={description} onChange={(a) => setDescription(a.target.value)} placeholder='Event Description' />
//             <br/>
//             <input type='submit' value='Submit' onSubmit={handleSubmit}/>
//         </div>
//     );
// }
