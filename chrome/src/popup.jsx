import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import 'regenerator-runtime/runtime'

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
            setErrMsg("Login to receive notifications of your events!");
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
            if (res.status >= 400) {
                console.log("Failed to get event ID: " + eventList[i]);
                continue;
            }
            const event = await res2.json();
            console.log(event);
            dispEvents.push(event);
        }
        console.log(dispEvents);
        updateDispList(dispEvents);
    }, []);
    return(
    <div>
        <h1>RendeYou</h1>
        <p>{err_msg}</p>
        <>{
        dispList.map(
          event => {
            return (
                <tr>
                <td>{event.title} </td>
                <td> {event.date}</td>
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
