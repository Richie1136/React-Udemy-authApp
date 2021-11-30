import React, { useState } from 'react'

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (token) => { }
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const userLoggedIn = !!token


  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setToken(null)
  }

  const loginHandler = (token) => {
    localStorage.setItem('isLoggedIn', 'Logged In')
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