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
  Badge,
} from "react-bootstrap"
import CustomPagination from "./pagination"
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa"

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
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="bg-success text-white">
            <Modal.Title>
              {`${selectedUser.name.first} ${selectedUser.name.last}`}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="align-items-center">
              {/* Profile Image */}
              <Col md={4} className="d-flex justify-content-center">
                <Card className="border-0 rounded-lg shadow-lg">
                  <Card.Img
                    variant="top"
                    src={selectedUser.picture.large}
                    className="img-fluid rounded-circle m-4"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                    }}
                    alt="Profile"
                  />
                </Card>
              </Col>

              {/* User Details */}
              <Col md={8}>
                <Card className="shadow-lg border-0">
                  <Card.Body>
                    {/* Date of Birth */}
                    <Row className="mt-4">
                      <Col md={6}>
                        <h4 className="text-success">Date of Birth:</h4>
                        <Badge pill bg="info" className="fs-6">
                          {selectedUser.dob.date.split("T")[0]}
                        </Badge>
                      </Col>
                      <Col md={6}>
                        <h5 className="mt-3">
                          Age:{" "}
                          <span className="text-primary">
                            {selectedUser.dob.age}
                          </span>
                        </h5>
                      </Col>
                    </Row>

                    {/* Age */}
                    <Row></Row>

                    {/* Contact Information */}
                    <Row>
                      <Col md={12}>
                        <div className="mt-3">
                          <h6>
                            <FaEnvelope className="text-primary" />{" "}
                            <strong>Email:</strong>{" "}
                            <a
                              href={`mailto:${selectedUser.email}`}
                              className="text-primary"
                            >
                              {selectedUser.email}
                            </a>
                          </h6>
                        </div>
                        <div className="mt-2">
                          <h6>
                            <FaPhone className="text-warning" />{" "}
                            <strong>Phone:</strong>{" "}
                            <a
                              href={`tel:${selectedUser.phone}`}
                              className="text-success"
                            >
                              {selectedUser.phone}
                            </a>
                          </h6>
                        </div>
                        <div className="mt-2">
                          <h6>
                            <FaMapMarkerAlt className="text-danger" />{" "}
                            <strong>Location:</strong>{" "}
                            <span className="text-muted">
                              {`${selectedUser.location.street.number} ${selectedUser.location.street.name}, ${selectedUser.location.city}, ${selectedUser.location.state}, ${selectedUser.location.country}`}
                            </span>
                          </h6>
                        </div>
                        <div className="mt-2">
                          <h6>
                            <FaUser className="text-success" />
                            <strong>Username:</strong>{" "}
                            <span className="text-muted">
                              {selectedUser.login.username}
                            </span>
                          </h6>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>

          {/* Modal Footer with Action Buttons */}
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Edit Profile
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
