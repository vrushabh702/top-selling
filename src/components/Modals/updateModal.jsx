import { randomInt } from "mathjs"
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
  const [randomNumber1, setRandomNumber1] = useState(null)
  const [randomNumber2, setRandomNumber2] = useState(null)
  const [userInput, setUserInput] = useState("")
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false)

  useEffect(() => {
    if (selectedProduct && showModal) {
      setUpdatedProduct({
        name: selectedProduct.name,
        sky: selectedProduct.sky,
        price: selectedProduct.price,
      })

      const num1 = randomInt(0, 100)
      const num2 = randomInt(0, 100)
      setRandomNumber1(num1)
      setRandomNumber2(num2)
      setUserInput("")
      setIsUpdateEnabled(false)
    }
  }, [showModal, selectedProduct])

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

  const handleMathInputChange = (e) => {
    const input = e.target.value
    setUserInput(input)

    const correctAnswer = randomNumber1 + randomNumber2
    if (parseInt(input) === correctAnswer) {
      setIsUpdateEnabled(true)
    } else {
      setIsUpdateEnabled(false)
    }
  }

  const handleSaveChanges = () => {
    // Call the update handler passed down to save the changes
    handleUpdate(updatedProduct)

    toast.success("Product updated successfully!", {
      position: toast.POSITION_TOP,
      autoClose: 2000, // Toast will disappear after 3 seconds
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
            {/* Add the math question for verification */}
            {/* I WANT A LINE OVER HIERE I  */}
            <Form.Group className="mt-4 text-warning bg-light">
              <p> To confirm, please solve the following:</p>
              <strong>
                {randomNumber1} + {randomNumber2} = ?
              </strong>
            </Form.Group>
            <Form.Control
              type="number"
              placeholder="Enter the number to confirm"
              value={userInput}
              onChange={handleMathInputChange}
            />
          </Form>
        ) : (
          <p>No product selected</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={!isUpdateEnabled}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateModal
