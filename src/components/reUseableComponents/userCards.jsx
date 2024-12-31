import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap"
import CustomPagination from "./pagination"

// Fetching random users from RandomUser API
const UserCardsData = () => {
  const [users, setUsers] = useState([]) // Store users data
  const [loading, setLoading] = useState(true) // Manage loading state
  const [error, setError] = useState("") // Error state

  const [showModal, setShowModal] = useState(false) // Manage modal visibility
  const [selectedUser, setSelectedUser] = useState(null) // Store selected user data for modal

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Adjust this based on how many items you want per page

  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  // const filteredProducts = filterProducts()

  const currentProducts = users.slice(indexOfFirstProduct, indexOfLastProduct)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Fetch data using Axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=100") // Fetch 10 random users
      setUsers(response.data.results) // Set users data
      console.log(response.data.results, "users")
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

  const handleCloseModal = () => setShowModal(false)
  // Handle modal open and set selected user data
  const handleShowModal = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

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
        {currentProducts.map((user, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-lg">
              <Card.Img
                variant="top"
                src={user.picture.large}
                className="card-img-top rounded-circle mx-auto d-block mt-3"
                style={{ width: "220px", height: "2 20px", objectFit: "cover" }}
                alt={`${user.name.first} ${user.name.last}`}
              />
              <Card.Body className="text-center">
                <Card.Title>{`${user.name.first} ${user.name.last}`}</Card.Title>
                <Card.Text>
                  <strong>Age:</strong> {user.dob.age}
                </Card.Text>
                <Card.Text>
                  <strong>Location:</strong> {user.location.city},
                  {user.location.state}, {user.location.country}
                </Card.Text>
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
                <Button variant="primary" onClick={() => handleShowModal(user)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="text-success">{`${selectedUser.name.first} ${selectedUser.name.last}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="text-center">
              <Col md={4} className="mt-5">
                <img
                  src={selectedUser.picture.large}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={8}>
                <h4>Date of Birth: {selectedUser.dob.date.split("T")[0]}</h4>
                <h5>Age: {selectedUser.dob.age}</h5>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>street number:</strong>{" "}
                  {selectedUser.location.street.number}{" "}
                  <strong>street name:</strong>
                  {selectedUser.location.street.name}, <strong>city </strong>
                  {selectedUser.location.city}, {selectedUser.location.state},{" "}
                  <strong>Country:</strong>
                  {selectedUser.location.country}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser.login.username}
                </p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <CustomPagination
        totalItems={users.length} // Pass the total number of filtered products
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  )
}

export default UserCardsData
