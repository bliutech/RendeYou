import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import 'regenerator-runtime/runtime';
import classes from "./popup.module.css";

function backend(endpoint) {
    return 'http://localhost:8000' + endpoint;
}

function PopUp() {
    const [dispList, updateDispList] = useState([]);
    const [err_msg, setErrMsg] = useState('');
    useEffect(async () => {
        const res = await fetch(backend('/user/me'), {
            method: 'GET',
            credentials: 'include',
        });
        if (res.status >= 400) {  // Only error is 403 Forbidden - Not logged in
            setErrMsg("Login to receive your events!");
            return;
        }
        let res_j = await res.json();
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
            console.log(event);
            dispEvents.push(event);
        }
        console.log(dispEvents);
        updateDispList(dispEvents);
    }, []);
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
}

render(<PopUp />, document.getElementById("react-target"));
