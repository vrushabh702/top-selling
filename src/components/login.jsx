import React, { useState } from "react"
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
  // State for email, password, and role
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if email and password are entered (for simplicity, no real validation)
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // Example credentials (can be changed to real validation)
    const user = {
      email: email,
      password: password,
      role: "admin", // hardcoded role as admin
    }

    // Store data in localStorage
    localStorage.setItem("user", JSON.stringify(user))

    toast.success("Login successful!", {
      position: toast.POSITION,
      autoClose: 1000, // The toast will disappear after 3 seconds
    })

    // Optionally, redirect to another page (like dashboard)
    navigate("/")
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card bg="light" className="shadow-sm mt-5 ">
            <Card.Body>
              <h2 className="text-center">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 col-12">
                  Login
                </Button>
                {/* <a href="#ForgetPassword" className="text-danger mt-2">
                  Forget Password ?
                </a> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
