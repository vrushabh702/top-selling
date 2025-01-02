import React, { useState, useEffect } from "react"
import { Modal, Button, Form, Spinner } from "react-bootstrap"
import axios from "axios"
import { toast } from "react-toastify"
import * as math from "mathjs" // Importing mathjs for random number generation

const DeleteModal = ({ show, handleClose, productId, handleDeleteConfirm }) => {
  const [randomNumber1, setRandomNumber1] = useState(null)
  const [randomNumber2, setRandomNumber2] = useState(null)
  const [userInput, setUserInput] = useState("")
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Generate random numbers when the modal is shown
  useEffect(() => {
    if (show && productId) {
      const num1 = math.randomInt(0, 101) // Random integer between 0 and 100
      const num2 = math.randomInt(0, 101) // Random integer between 0 and 100
      setRandomNumber1(num1)
      setRandomNumber2(num2)
      setUserInput("")
      setIsDeleteEnabled(false)
    }
  }, [show, productId])

  const handleDelete = async () => {
    setIsDeleting(true) // Immediately show the spinner by setting isDeleting to true

    try {
      // Trigger the delete API call
      await axios.delete(`https://fakestoreapi.com/products/${productId}`)
      handleDeleteConfirm(productId) // Update the parent component's state to remove the product
      handleClose() // Close the modal after deletion
      toast.success(`Product with ID: ${productId} has been deleted!`, {
        position: toast.POSITION,
        autoClose: 2000,
      })
    } catch (err) {
      toast.error("Error deleting product: " + err.message) // Show error toast
    } finally {
      setIsDeleting(false) // Stop the spinner after the API call is complete, in both success and failure
    }
  }

  const handleInputChange = (e) => {
    const input = e.target.value
    setUserInput(input)

    // Enable delete button if the user input matches the sum of the random numbers
    const correctAnswer = randomNumber1 + randomNumber2
    if (parseInt(input) === correctAnswer) {
      setIsDeleteEnabled(true)
    } else {
      setIsDeleteEnabled(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete the product with ID:{" "}
          <strong>{productId}</strong>?
        </p>
        <p>To confirm, please enter the sum of the two numbers below:</p>
        <div>
          <p>
            {randomNumber1} + {randomNumber2} = ?
          </p>
          <Form.Control
            type="number"
            placeholder="Enter the sum"
            value={userInput}
            onChange={handleInputChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={!isDeleteEnabled || isDeleting} // Disable the delete button until the correct sum is entered
        >
          {isDeleting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
