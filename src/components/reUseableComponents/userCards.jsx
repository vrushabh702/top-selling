import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col, Card, Spinner } from "react-bootstrap"

// Fetching random users from RandomUser API
const UserCardsData = () => {
  const [users, setUsers] = useState([]) // Store users data
  const [loading, setLoading] = useState(true) // Manage loading state
  const [error, setError] = useState("") // Error state

  // Fetch data using Axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10") // Fetch 10 random users
      setUsers(response.data.results) // Set users data
    } catch (err) {
      setError("Error fetching users")
    } finally {
      setLoading(false) // Set loading to false once data is fetched
    }
  }

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>
  }

  return (
    <Container>
      <Row className="mt-4">
        {users.map((user, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
              />
              <Card.Body>
                <Card.Title>{`${user.name.first} ${user.name.last}`}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                <Card.Text>
                  <strong>Gender:</strong>{" "}
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </Card.Text>
                <Card.Text>
                  <strong>Age:</strong> {user.dob.age}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default UserCardsData
