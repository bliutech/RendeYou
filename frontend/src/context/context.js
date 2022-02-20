import React, { createContext, useState } from 'react'

export const userContext = createContext()

//These values are accessable in any component
const UserContextProvider = (props) => {
  const [userData, setUserData] = useState([])
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <UserContextProvider
      value={(userData, setUserData, isSignedIn, setIsSignedIn)}
    >
      {props.children}
    </UserContextProvider>
  )
}

export default UserContextProvider
