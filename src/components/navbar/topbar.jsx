import React, { useEffect, useState } from "react"
import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useUser } from "../userContext"

const Topbar = () => {
  const { user, setUser } = useUser()
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const username = user.email.split("@")[0]
      setUserName(username) // Store the username
    }
  }, [user])

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
        <Navbar.Brand href="#" className="text-info">
          Product Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Avatar Icon in the Topbar */}
            <Navbar.Brand className="mt-2 text-info" href="#">
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
