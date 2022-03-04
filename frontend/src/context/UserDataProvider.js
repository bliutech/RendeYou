import React from 'react';
import { useState } from 'react';
import backend from '../components/Util';

const UserDataContext = React.createContext();

const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedin, setisLoggedin] = useState(false);
  // const setUser = async (currUser) => {
  //   const res = await fetch(backend('/user/me'), {
  //     method: 'PUT',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(currUser),
  //   });
  //   if (res.status >= 400) {
  //     console.log();
  //   }
  //   updateUser(currUser);
  // };
  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        isLoggedin,
        setisLoggedin,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
