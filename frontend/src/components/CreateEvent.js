import React, { useContext, useState } from 'react';
import backend, { checkSession, formatDate } from './Util.js';
import { getUserData } from './Util.js';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import './CreateEvent.module.css';
import { UserDataContext } from '../context/UserDataProvider.js';
import LocationPicker from './LocationPicker.js';
import classes from './CreateEvent.module.css';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  let [title, setTitle] = useState('');
  let [date, setDate] = useState();
  let [description, setDescription] = useState('');
  let [time, setTime] = useState();
  const [location, setLocation] = useState('');
  const { updateData } = useContext(UserDataContext);
  const [err_msg, setErrMsg] = useState('');
  let navigate = useNavigate();

  async function handleSubmit() {
    const curr_date = new Date(date + ' ' + time + ':00.000');
    console.log(curr_date.getTime())
    const data = {
      title: title,
      date: curr_date.getTime(),
      description: description,
      location: location,
    };
    console.log(data);
    const res = await fetch(backend('/event/new'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status >= 400) {
      alert("Event failed to create!");
      console.log(res.error);
      return;
    }
    await updateData();
    navigate('/');
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          console.log(date);
        }}
        className={classes.hereForm}
      >
        <h1> Create Event </h1>
        <p> Event Name: </p>
        <input
          type='text'
          value={title}
          onChange={(a) => setTitle(a.target.value)}
          placeholder='Event Name'
          className={classes.hereInput}
        />
        <p> Date: </p>
        <input
          type='date'
          value={date}
          onChange={(a) => setDate(a.target.value)}
          className={classes.hereInput}
        />
        <p> Time: </p>
        <input
          type='time'
          value={time}
          onChange={(a) =>
            setTime(a.target.value)
          }
          className={classes.hereInput}
        />
        <p> Location: </p>
        <LocationPicker location={location} setLocation={setLocation} className={classes.hereInput}/>
        <p> Description: </p>
        <textarea
          type='text'
          value={description}
          onChange={(a) => setDescription(a.target.value)}
          placeholder='Event Description'
          className={classes.hereInput}
        />

        <br />

        <input type='submit' value='Submit' className={classes.hereButton}/>
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
