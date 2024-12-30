import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" // Make sure you import the CSS file

function UpdateModal({
  showModal,
  setShowModal,
  selectedProduct,
  handleUpdate,
}) {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    sky: "",
    price: "",
  })

  useEffect(() => {
    if (selectedProduct) {
      setUpdatedProduct({
        name: selectedProduct.name,
        sky: selectedProduct.sky,
        price: selectedProduct.price,
      })
    }
  }, [selectedProduct])

  const handleCloseModal = () => {
    setShowModal(false) // Close the modal
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Call the update handler passed down to save the changes
    handleUpdate(updatedProduct)

    toast.success("Product updated successfully!", {
      position: toast.POSITION_TOP,
      autoClose: 3000, // Toast will disappear after 3 seconds
    })

    setShowModal(false) // Close the modal after saving changes
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title className="justify-content-center">
          Update Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProduct ? (
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductSku">
              <Form.Label>Product SKU</Form.Label>
              <Form.Control
                type="text"
                name="sky"
                value={updatedProduct.sky}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                step="0.01"
              />
            </Form.Group>
          </Form>
        ) : (
          <p>No product selected</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateModal
