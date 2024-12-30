import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Remove user data from localStorage
    localStorage.removeItem("user")

    // Redirect to the login page after logging out
    navigate("/login")
  }, [navigate])

  return null // No UI is rendered for this component, it only handles the logic
}

export default Logout
