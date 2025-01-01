import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap"
import { FaEdit, FaThumbsUp, FaComment } from "react-icons/fa"

const EditModal = ({ show, post, handleClose, handleSaveChanges }) => {
  const [editedPost, setEditedPost] = useState({})

  useEffect(() => {
    if (post) {
      setEditedPost(post)
    }
  }, [post])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedPost({
      ...editedPost,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${editedPost.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: editedPost.title,
            price: editedPost.price,
            description: editedPost.description,
            image: editedPost.image,
            category: editedPost.category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const updatedProduct = await response.json()
      handleSaveChanges(updatedProduct) // Notify parent to update state
      handleClose() // Close the modal
    } catch (err) {
      console.error("Error updating product:", err)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            {/* Title */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Title</InputGroup.Text>
              <FormControl
                name="title"
                value={editedPost.title || ""}
                onChange={handleInputChange}
              />
            </InputGroup>

            {/* Price */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Price</InputGroup.Text>
              <FormControl
                name="price"
                type="number"
                value={editedPost.price || ""}
                onChange={handleInputChange}
              />
            </InputGroup>

            {/* Description */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <FormControl
                as="textarea"
                rows={3}
                name="description"
                value={editedPost.description || ""}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            {/* Category */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Category</InputGroup.Text>
              <FormControl
                name="category"
                value={editedPost.category || ""}
                onChange={handleInputChange}
              />
            </InputGroup>

            {/* Image URL */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Image URL</InputGroup.Text>
              <FormControl
                name="image"
                value={editedPost.image || ""}
                onChange={handleInputChange}
              />
            </InputGroup>

            {/* Rating */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Rating</InputGroup.Text>
              <FormControl
                name="rating"
                type="number"
                step="0.1"
                value={editedPost.rating?.rate || ""}
                onChange={handleInputChange}
              />
            </InputGroup>

            {/* Display Rating Count */}
            <Row>
              <Col>
                <p>Rating Count: {editedPost.rating?.count || 0}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
