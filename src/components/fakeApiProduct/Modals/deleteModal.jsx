import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import { randomInt } from "mathjs" // Mathjs to generate random numbers

function DeleteModal({
  showModal,
  setShowModal,
  selectedProduct,
  handleDelete,
}) {
  const [randomNumber1, setRandomNumber1] = useState(null)
  const [randomNumber2, setRandomNumber2] = useState(null)
  const [userInput, setUserInput] = useState("")
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false)

  // Generate a random number when the modal is opened
  useEffect(() => {
    if (showModal && selectedProduct) {
      const num1 = randomInt(0, 100)
      const num2 = randomInt(0, 100)
      setRandomNumber1(num1)
      setRandomNumber2(num2)
      setUserInput("")
      setIsDeleteEnabled(false)
    }
  }, [showModal, selectedProduct])

  const handleCloseModal = () => {
    setShowModal(false) // Close the modal without deleting
  }

  const handleDeleteProduct = () => {
    handleDelete(selectedProduct) // Call the delete handler passed from the parent
    toast.error(`${selectedProduct.name} has been deleted!`, {
      position: toast.POSITION, // Positioning the toast on the top right
      autoClose: 2000, // The toast will disappear after 2 seconds
    })

    setShowModal(false) // Close the modal after deleting
  }

  const handleInputChange = (e) => {
    const input = e.target.value
    setUserInput(input)

    // Enable delete button if user input matches the sum of the two random numbers
    const correctAnswer = randomNumber1 + randomNumber2
    if (parseInt(input) === correctAnswer) {
      setIsDeleteEnabled(true)
    } else {
      setIsDeleteEnabled(false)
    }
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
              Are you sure you want to delete "<br /> {selectedProduct.name}"?
            </h4>
            <p className="text-center mb-4 text-info">
              This action cannot be undone.
            </p>

            <div className="text-center text-danger mb-4 ">
              <p>To confirm, please solve the following:</p>
              <strong>
                {randomNumber1} + {randomNumber2} = ?
              </strong>{" "}
              {/* Display random math problem */}
            </div>
            <Form.Control
              type="number"
              placeholder="Enter the number to confirm"
              value={userInput}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <p>No product selected</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDeleteProduct}
          disabled={!isDeleteEnabled} // Enable delete only when the correct answer is entered
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
