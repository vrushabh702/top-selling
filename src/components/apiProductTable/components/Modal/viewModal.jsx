import React from "react"
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
} from "react-bootstrap"
import {
  FaBarcode,
  FaRegClock,
  FaShippingFast,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa"

const ViewModal = ({ showModal, setShowModal, selectedProduct }) => {
  const handleClose = () => setShowModal(false)

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="lg"
      centered
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {selectedProduct?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-4">
          <Col md={6} className="text-center">
            <Card>
              <Card.Img
                variant="top"
                src={selectedProduct?.images[0]}
                alt={selectedProduct?.title}
                className="img-fluid"
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-success">
                  ${selectedProduct?.price.toFixed(2)}
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  <Badge variant="warning">
                    {selectedProduct?.discountPercentage}% Off
                  </Badge>
                </Card.Subtitle>
                <div className="d-flex align-items-center mb-3">
                  <FaStar color="#FFD700" />{" "}
                  <span className="ms-2">{selectedProduct?.rating} / 5</span>
                </div>
                <div className="mb-3">
                  <p
                    className={
                      selectedProduct?.availabilityStatus === "Low Stock"
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    <strong>Status:</strong>{" "}
                    {selectedProduct?.availabilityStatus}
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong>Brand:</strong> {selectedProduct?.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedProduct?.category}
                  </p>
                  <p>
                    <strong>SKU:</strong> {selectedProduct?.sku}
                  </p>
                </div>
                <Button variant="primary" className="w-100 mb-2">
                  <FaShoppingCart /> Add to Cart
                </Button>
                <p>
                  <strong>Warranty:</strong>{" "}
                  {selectedProduct?.warrantyInformation}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4 bg-light">
          <Col md={12}>
            <h5>Description</h5>
            <p>{selectedProduct?.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h5>Reviews</h5>
            {selectedProduct?.reviews.length > 0 ? (
              <ListGroup variant="flush">
                {selectedProduct.reviews.map((review, index) => (
                  <ListGroup.Item key={index} className="border-0">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <FaStar color="#FFD700" />{" "}
                        <span className="ms-2">{review.rating} Stars</span>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                    <p className="text-muted">
                      <FaRegClock />{" "}
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No reviews available.</p>
            )}
          </Col>
          <Col md={6}>
            <h5>Return Policy</h5>
            <p>{selectedProduct?.returnPolicy}</p>

            <h5>Dimensions</h5>
            <p>
              <strong>Width:</strong> {selectedProduct?.dimensions.width} cm
            </p>
            <p>
              <strong>Height:</strong> {selectedProduct?.dimensions.height} cm
            </p>
            <p>
              <strong>Depth:</strong> {selectedProduct?.dimensions.depth} cm
            </p>
            <h5>Shipping Information</h5>
            <p>
              <FaShippingFast /> {selectedProduct?.shippingInformation}
            </p>

            <h5>Barcode</h5>
            <p>
              <FaBarcode /> {selectedProduct?.meta.barcode}
            </p>
          </Col>
        </Row>
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
