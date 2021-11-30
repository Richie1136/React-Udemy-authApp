import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (token) => { }
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const userLoggedIn = !!token

  useEffect(() => {
    const storedinfo = localStorage.getItem("isLoggedIn")
    if (storedinfo === 'Logged In') {
      setIsLoggedin(true)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setToken(null)
  }

  const loginHandler = () => {
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