import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

function NotFound({ element }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const StoreUser = localStorage.getItem("user")
    setUser(StoreUser)
  }, [])

  if (user) {
    return <Navigate to="/" replace />
  }
  return <Navigate to="/login" replace />
}

export default NotFound
