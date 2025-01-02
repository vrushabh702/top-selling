import React, { useState, useEffect } from "react"
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap"
import { FaBeer, FaEdit, FaSave, FaTimes } from "react-icons/fa"
import { toast } from "react-toastify"

const EditModal = ({ show, handleClose, productId, handleUpdateProduct }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch product data based on the productId
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          )
          const data = await response.json()
          setProduct({
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.image,
            category: data.category,
          })
        } catch (err) {
          setError("Error fetching product details")
        } finally {
          setLoading(false)
        }
      }
      fetchProduct()
    }
  }, [productId])

  // Handle the update API request
  const handleUpdate = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "put",
          body: JSON.stringify({
            title: product.title,
            price: parseFloat(product.price),
            description: product.description,
            image: product.image,
            category: product.category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.json()
      if (response.ok) {
        handleUpdateProduct(data) // Pass the updated data back to the parent
        toast.success("Product updated successfully!") // Show success toast
        handleClose() // Close the modal
      } else {
        throw new Error("Failed to update product")
      }
    } catch (err) {
      toast.error("Error updating product: " + err.error) // Show error toast
      setError("Error updating product")
      setLoading(false) // Keep modal open on error
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">
          Edit Product <FaEdit />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
            <h3>Updating Product...</h3>
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && (
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product image URL"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FaTimes /> Close
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={loading}>
          <FaSave /> Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
