import React, { createContext, useContext, useEffect, useState } from "react"

// Create the Context
const UserContext = createContext()

// Create a custom hook to use the context
export const useUser = () => {
  return useContext(UserContext)
}

// Create a Provider component that will wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if there's user data in localStorage (for initial state)
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)) // Save to localStorage
    }
  }, [user]) // Trigger this whenever `user` changes

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
