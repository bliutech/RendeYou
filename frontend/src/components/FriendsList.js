import React from "react"
import classes from "./FriendsList.module.css"
import backend from "./Util.js"

const FriendsList = async () => {
    const dispList = [
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

    //  TODO: Test linking with backend by uncommenting the below code block

    // const res = await fetch(backend('/user/me'), {
    //     credentials: "include",
    // })
    // res_j = await res.json();
    // const IDList = res_j.friends;
    // let str = IDList.join();
    // console.log(str);  // Debugging
    // dispList = await fetch(backend('/user'), {
    //     ids: str,
    // })

    return (<>{
        dispList.map(
          person => {
            return (
              <tr>
                <td><img className={classes.image} src={person.image} /></td>
                <td style={{textAlign:"left"}}>
                    <div className={classes.subitem}>
                        <p className={classes.largebody}>{person.firstname} {person.lastname}</p>
                        <p className={classes.bodytext}>{person.email}</p>
                    </div>
                </td>
              </tr>
            );
          }
        )
    }
    </>
    );
    // return renderItem(dispList[0]);
    //   <>
    //   <SafeAreaView style={styles.container}>
    //   <FlatList
    //   data={dispList}
    //   renderItem={renderItem}
    //   />
    //   </SafeAreaView>
    //   </>
  }
  
  export default FriendsList;
  