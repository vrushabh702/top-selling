import React, { useState } from "react"
import axios from "axios"
import { Modal, Button, Form, Spinner } from "react-bootstrap"
import { toast } from "react-toastify" // Import react-toastify
import "react-toastify/dist/ReactToastify.css" // Import styles for toastify

const AddModal = ({ show, handleClose, handleAddProduct }) => {
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post("https://fakestoreapi.com/products", {
        ...productData,
      })

      // Add the new product to the parent component
      handleAddProduct(response.data)

      // Show success toast
      toast.success("Product added successfully!")
      setProductData({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      })

      handleClose() // Close the modal after adding the product
    } catch (err) {
      setError("Error adding product")

      // Show error toast
      toast.error("Error adding product!")
    } finally {
      setLoading(false)
    }
  }

  // Reset the form data when the modal is closed
  const handleCloseModal = () => {
    setProductData({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    }) // Reset form fields
    handleClose() // Close the modal
  }

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product image URL"
              name="image"
              value={productData.image}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product category"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Add Product"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddModal
