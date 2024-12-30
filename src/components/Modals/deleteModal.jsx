import React from "react"
import { Modal, Button } from "react-bootstrap"
import { toast } from "react-toastify"

function DeleteModal({
  showModal,
  setShowModal,
  selectedProduct,
  handleDelete,
}) {
  const handleCloseModal = () => {
    setShowModal(false) // Close the modal without deleting
  }

  const handleDeleteProduct = () => {
    handleDelete(selectedProduct) // Call the delete handler passed from the parent
    toast.error(`${selectedProduct.name} has been deleted!`, {
      position: toast.POSITION, // Positioning the toast on the top right
      autoClose: 2000, // The toast will disappear after 3 seconds
    })

    setShowModal(false) // Close the modal after deleting
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title className="justify-content-center">
          Delete Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {selectedProduct ? (
          <div>
            <h4 className="text-center mb-4 text-danger">
              Are you sure you want to delete " <br></br> {selectedProduct.name}
              "?
            </h4>
            <p className="text-center mb-4 text-warning">
              This action cannot be undone.
            </p>
          </div>
        ) : (
          <p>No product selected</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
