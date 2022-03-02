import React from 'react'
import { useState } from 'react'

const UserDataContext = React.createContext()

const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(false)
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export { UserDataContext, UserDataProvider }
