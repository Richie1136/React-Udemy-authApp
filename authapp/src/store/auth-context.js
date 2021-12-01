import React, { useState } from 'react'

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (token) => { }
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjustedTime = new Date(expirationTime).getTime()
  const remainingTime = adjustedTime - currentTime
  return remainingTime
}


const retreiveStoredToken = () => {
  const storedToken = localStorage.getItem('isLoggedIn')
  const storedExpirationDate = localStorage.getItem('expiration')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 0) {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("expiration")
    return null
  }
  return {
    token: storedToken,
    time: remainingTime
  }
}

export const AuthContextProvider = ({ children }) => {
  const tokenData = retreiveStoredToken()
  const initialToken = localStorage.getItem('isLoggedIn')
  const [token, setToken] = useState(initialToken)

  const userLoggedIn = !!token


  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setToken(null)

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('isLoggedIn', token)
    localStorage.setItem('expiration', expirationTime)
    setToken(token)
    const remainingDuration = calculateRemainingTime(expirationTime)
    logoutTimer = setTimeout(logoutHandler, remainingDuration)
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