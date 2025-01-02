import React, { useState, useEffect } from "react"
import { Modal, Button, Card, Row, Col, Spinner } from "react-bootstrap"
import { FaStar, FaTag, FaDollarSign, FaListUl, FaBook } from "react-icons/fa"
import axios from "axios"

const ViewModal = ({ show, handleClose, productId }) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${productId}`
          )
          setProduct(response.data)
        } catch (err) {
          setError("Error fetching product details")
        } finally {
          setLoading(false)
        }
      }
      fetchProduct()
    }
  }, [productId])

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-center text-info">
          Product Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
            <h3>Loading Product...</h3>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {product && !loading && (
          <Row>
            <Col md={4}>
              <Card style={{ borderRadius: "10px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    objectFit: "cover",
                    height: "300px",
                    borderRadius: "10px",
                  }}
                />
              </Card>
            </Col>
            <Col md={8}>
              <Row>
                <Col>
                  <Card style={{ border: "none", marginBottom: "20px" }}>
                    <Card.Body>
                      <Card.Title style={{ color: "#0056b3" }}>
                        {product.title}
                      </Card.Title>
                      <Card.Text className="mt-3">
                        {product.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col md={6}>
                  <Card className="bg-light">
                    <Card.Body>
                      <Card.Text>
                        <FaTag color="#28a745" /> <strong>Category:</strong>{" "}
                        {product.category}
                      </Card.Text>
                      <Card.Text>
                        <FaDollarSign color="#17a2b8" /> <strong>Price:</strong>{" "}
                        ${product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card style={{ backgroundColor: "#f8f9fa" }}>
                    <Card.Body>
                      <Card.Text>
                        <FaStar color="#ffc107" /> <strong>Rating:</strong> (
                        {product.rating.rate} Average)
                      </Card.Text>
                      <Card.Text>
                        <FaBook color="#6c757d" /> <strong>Reviews:</strong> (
                        {product.rating.count} Reviews)
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewModal
