import React from "react"
import { Button, Card, Col, Modal, Row, Spinner, Image } from "react-bootstrap"
import { FaThumbsUp, FaStar } from "react-icons/fa"

const ViewModal = ({ show, product, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{product ? product.title : ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product ? (
          <Row>
            <Col md={6}>
              <Card className="shadow-sm bg-light">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <h5 className="text-success">
                    <FaThumbsUp /> ${product.price}
                  </h5>
                  <p className="mt-3">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <div>
                    <strong>Rating:</strong>
                    <div>
                      <FaStar color="gold" /> {product.rating.rate} (
                      {product.rating.count} reviews)
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-between">
              <Card className="shadow-sm bg-light">
                <Card.Body>
                  <h5 className="text-info">Product Details</h5>
                  <p>
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p>
                    <strong>Rating:</strong> {product.rating.rate} out of 5
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Description:</strong> {product.description}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewModal
