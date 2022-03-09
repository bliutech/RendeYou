import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import 'regenerator-runtime/runtime';
import classes from "./popup.module.css";

function backend(endpoint) {
    return 'http://165.232.135.214:8000' + endpoint;
}

function PopUp() {
    const [dispList, updateDispList] = useState([]);
    const [err_msg, setErrMsg] = useState('');
    const [signal, setSignal] = useState(0);
    const [loggedIn, setLogin] = useState(false);
    const [notified, setNotified] = useState(false);
    const [uname, setUname] = useState(""); 
    const [pass, setPass] = useState("");
    let nextEvent = " ";
    let nextEventTime = Date.now();
    let cookieVal = "";
    console.log("Initial time: " + Date.now());
    useEffect(async () => {
        chrome.cookies.get({"url": "http://165.232.135.214:8000", "name": "connect.sid"}, (cookie) => {
            console.log(cookie);
            cookieVal = cookie.value;
        });
        const res = await fetch(backend('/user/me'), {
            method: 'GET',
            credentials: 'include',
        });
        if (res.status >= 400) {  // Only error is 403 Forbidden - Not logged in
            setErrMsg("Login to receive your events!");
            setLogin(false);
            return;
        }
        let res_j = await res.json();
        setLogin(true);
        setErrMsg("Welcome back, " + res_j.firstName + "!");
        const eventList = res_j.hostedEvents.concat(res_j.subscriptions);
        let dispEvents = [];
        for (let i = 0; i < eventList.length; i++) {
            const res2 = await fetch(backend('/event/' + eventList[i]), {
                method: 'GET',
                credentials: 'include',
                id: eventList[i],
            });
            if (res2.status >= 400) {
                console.log("Failed to get event ID: " + eventList[i]);
                continue;
            }
            let event = await res2.json();
            if (Date.now() > nextEventTime) {
                nextEventTime = event.date;
                nextEvent = event.title;
                console.log("Set alert for event: " + event.title + "for time: " + event.date);
                setNotified(false);
            } else if (event.date > Date.now() && nextEventTime > event.date) {
                nextEventTime = event.date;
                nextEvent = event.title;
                console.log("Set alert for event: " + event.title + "for time: " + event.date);
                setNotified(false);
            }
            const date = new Date(event.date);
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const datestr = date.toLocaleDateString('en-US', options) + " " + date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
            event.date = datestr;
            dispEvents.push(event);
        }
        updateDispList(dispEvents);
        setInterval(async () => {
            const res = await fetch(backend('/user/me'), {
                method: 'GET',
                credentials: 'include',
            });
            if (res.status >= 400) {  // Only error is 403 Forbidden - Not logged in
                return;
            }
            setSignal(Date.now() % 1000);
            console.log("Checking time... Next event: " + nextEventTime);
            console.log(nextEvent);
            if (Date.now() + 601000 > nextEventTime && !notified) {  // Not handling when event time is past now. 
                window.alert(nextEvent + " is happening in less than 10 minutes!");
                setNotified(true);
            }
        }, 10000)  // Refresh after 10 seconds
    }, [signal]);


    async function handleSubmit(uname, pass) {
        const data = {
          username: uname,
          password: pass,
        };
        const res = await fetch(backend('/login'), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (res.status >= 400) {
            setErrMsg(res.error);
        } else {
            setSignal(Date.now() % 100);
        }
    }


    if (loggedIn) {
        return(
        <div className={classes.frame}>
            <h1>RendeYour Events</h1>
            <p className={classes.largebody}>{err_msg}</p>
            <>{
            dispList.map(
            event => {
                return (
                    <tr className={classes.subitem}>
                    <td className={classes.bodytext}>{event.title}</td>
                    <td className={classes.bodytext2}>{event.date}</td>
                </tr>
                );
            }
            )
            }
        </>
        </div>
        );
    } else {
        return(
        <div className={classes.frame}>
        <h1>RendeYour Events</h1>
        <p className={classes.largebody}>{err_msg}</p>
        <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(uname, pass)
        }}
        >
        <legend>Username</legend>
        <input
          value={uname}
          onChange={(e) =>{ setUname(e.target.value); }}
          placeholder='Enter Username'
        />
        <legend>Password</legend>
        <input
          type='password'
          value={pass}
          onChange={(e) =>{ setPass(e.target.value); }}
          placeholder='Enter Password'
        />
        <br />
        <input type='submit' value='Submit' className={classes.button}/>
      </form>
      </div>
        );
    }
}

render(<PopUp />, document.getElementById("react-target"));
