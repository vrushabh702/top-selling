import React, { useEffect, useState } from "react"
import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Topbar = () => {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) // Assuming 'user' contains the email
    if (storedUser) {
      setUser(storedUser) // Set the user state with the data from localStorage
    }
    const username = storedUser.email.split("@")[0]
    setUserName(username) // Store the username
  }, [])

  const renderTooltip = (props) => (
    <Tooltip {...props}>{user ? user.email : "No email available"}</Tooltip>
  )

  const handleLogout = () => {
    // Navigate to the Logout route to handle the logout process
    navigate("/logout")
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="#">Product Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Avatar Icon in the Topbar */}
            <Navbar.Brand className="mt-2" href="#">
              welcome {userName ? userName : "Guest"} !!
            </Navbar.Brand>
            <button className="btn btn-danger  " onClick={handleLogout}>
              Logout
            </button>

            <Nav.Link href="#">
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                <img
                  src="../assets/images/man.png" // Replace with your avatar URL
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </OverlayTrigger>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Topbar
