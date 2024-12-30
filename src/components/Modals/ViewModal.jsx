import React from "react"
import { Modal, Button } from "react-bootstrap"

function ViewModal({ showModal, setShowModal, selectedProduct }) {
  const handleCloseModal = () => {
    setShowModal(false) // Close the modal
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title className="justify-content-center">
          Product Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {selectedProduct ? (
          <div>
            <h5 className="text-center mb-4 text-primary">Product Details</h5>
            <div className="mb-3">
              <strong>Sr No:</strong> <span>{selectedProduct.SrNo}</span>
            </div>
            <div className="mb-3">
              <strong>Name:</strong> <span>{selectedProduct.name}</span>
            </div>
            <div className="mb-3">
              <strong>Skv:</strong> <span>{selectedProduct.sky}</span>
            </div>
            <div className="mb-3">
              <strong>Price:</strong>{" "}
              <span>${selectedProduct.price.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <p>No product selected</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCloseModal}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewModal
