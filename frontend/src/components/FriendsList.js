import React, { useState, useEffect } from "react"
import classes from "./FriendsList.module.css"
import backend from "./Util.js"

const FriendsList = () => {
    const dispTestList = [
        {
            id: "1782637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
            image: 'https://reactnative.dev/img/tiny_logo.png',
        },
        {
            id: "182637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
            image: 'https://reactnative.dev/img/tiny_logo.png',
        },
        {
            id: "178237",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
            image: 'https://reactnative.dev/img/tiny_logo.png',
        },
        {
            id: "178637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
            image: 'https://reactnative.dev/img/tiny_logo.png',
        },
        {
            id: "178637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
            image: 'https://reactnative.dev/img/tiny_logo.png',
        },
    ];
    const [dispList, updateDispList] = useState([]);

    //  TODO: Test linking with backend by uncommenting the below code block
    useEffect(async () => {
        const res = await fetch(backend('/user/me'), {
            credentials: "include",
        })
        const res_j = await res.json();
        const IDList = res_j.friends;
        let str = IDList.join();
        console.log("Getting frineds...");
        if (str.length === 0) {
            console.log("No beaches?");
            updateDispList([]);
            return;
        }
        console.log(str);
        const dispres = await fetch(backend('/user'), {
            ids: str,
        })
        const dispres_json = await dispres.json();
        console.log("Display list:",dispres_json);
        updateDispList(dispres_json);
    }, []);
    if (dispList.length === 0) return (<p>Damn you have no Friends</p>);

    return (<>{
        dispList.map(
          person => {
            return (
                <tr>
                <td>
                    <div className={classes.item}>
                        <img className={classes.image} src="https://reactnative.dev/img/tiny_logo.png" alt="Italian Trulli" />
                    <div>
                        <p className={classes.largebody}>{person.firstName} {person.lastName}</p>
                        <p className={classes.bodytext}>{person.email}</p>
                    </div>
                    </div>
                </td>
              </tr>
            );
          }
        )
        }
    </>
    );
}
  
  export default FriendsList;
