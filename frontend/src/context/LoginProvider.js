import React from 'react'
import { useState } from 'react'

const LoginContext = React.createContext()

const LoginProvider = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false)
  return (
    <LoginContext.Provider
      value={{
        isLoggedin,
        setisLoggedin,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContext, LoginProvider }
