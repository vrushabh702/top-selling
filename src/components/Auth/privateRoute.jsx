import React from "react"
import { Navigate } from "react-router-dom"

function PrivateRoute({ element }) {
  const user = localStorage.getItem("user") // Check if there's a user in localStorage

  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If user is logged in, allow access to the protected route
  return element
}

export default PrivateRoute
