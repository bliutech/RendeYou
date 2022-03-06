import React from 'react';
import { useState, useEffect } from 'react';
import backend, { checkSession, getUserData } from '../components/Util';

const UserDataContext = React.createContext();

const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedin, setisLoggedin] = useState(false);
  useEffect(async () => {
    setisLoggedin(await checkSession());
    setUser(await getUserData());
  }, []);
  const updateData = async () => {
    setisLoggedin(await checkSession());
    setUser(await getUserData());
  };
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
        updateData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
