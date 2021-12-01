import React, { useState } from 'react'

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (token) => { }
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjustedTime = new Date(expirationTime)
}

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem('isLoggedIn')
  const [token, setToken] = useState(initialToken)

  const userLoggedIn = !!token


  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setToken(null)
  }

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('isLoggedIn', token)
    setToken(token)
  }

  const contextValue = {
    token,
    isLoggedIn: userLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler
  }
  return <AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider >
}

export default AuthContext