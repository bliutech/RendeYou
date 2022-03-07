import React, { useContext, useState } from 'react';
import backend, { checkSession, formatDate } from './Util.js';
import { getUserData } from './Util.js';
import './CreateEvent.module.css';
import { UserDataContext } from '../context/UserDataProvider.js';

export default function CreateEvent() {
  let [title, setTitle] = useState('');
  let [date, setDate] = useState();
  let [description, setDescription] = useState('');
  let [location, setLocation] = useState('');
  let [time, setTime] = useState();
  const { updateData } = useContext(UserDataContext);
  const [err_msg, setErrMsg] = useState('');

  // function getAsDate(day, time){
  //     var hours = Number(time.match(/^(\d+)/)[1]);
  //     var minutes = Number(time.match(/:(\d+)/)[1]);
  //     var AMPM = time.match(/\s(.*)$/);
  //     if(AMPM == "pm" && hours<12) hours = hours+12;
  //     if(AMPM == "am" && hours==12) hours = hours-12;
  //     var sHours = hours.toString();
  //     var sMinutes = minutes.toString();
  //     if(hours<10) sHours = "0" + sHours;
  //     if(minutes<10) sMinutes = "0" + sMinutes;
  //     time = sHours + ":" + sMinutes + ":00";
  //     var d = new Date(day);
  //     var n = d.toISOString().substring(0,10);
  //     var newDate = new Date(n+"T"+time);
  //     console.log(newDate);
  //     return newDate;
  // }

  async function handleSubmit() {
    const data = {
      title: title,
      date: date + time,
      description: description,
      location: location,
    };
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
  }

  return (
    <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} >
      
        <h1> Create Event </h1>
        
        <p> Event Name: </p>
        <input type='text' value={title} onChange={(a) => setTitle(a.target.value)} placeholder='Event Name' />
        
        <p> Date: </p>
        <input type='date' value={date} onChange={(a) => setDate(a.target.value)} />
        
        <p> Time: </p>
        <input type='time' value={time} onChange={(a) => setTime(a.target.value)} />

        <p> Description: </p>
        <textarea type='text' value={description} onChange={(a) => setDescription(a.target.value)} placeholder='Event Description' />
        
        <p> Location: </p>
        <input type='text' value={location} onChange={(a) => setLocation(a.target.value)} placeholder='Event Location' />

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
