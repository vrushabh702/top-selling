import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Table,
  Button,
  Spinner,
  Dropdown,
  Modal,
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"
import DeleteModal from "../Modals/deleteModal"
import EditModal from "../Modals/editModal"
import ViewModal from "../Modals/viewModal"

const FakeApiProductTable_2 = () => {
  // State variables
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editProduct, setEditProduct] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState({})

  const [modalProduct, setModalProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetching data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://fakestoreapi.com/products`)
        setProducts(response.data)
        console.log(response.data, "response.data")
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // Runs once when the component mounts

  // Fetching data with limit
  useEffect(() => {
    const fetchProductsWithLimit = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://fakestoreapi.com/products?limit=${limit}`
        )
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
        setLoading(false)
      }
    }

    fetchProductsWithLimit()
  }, [limit]) // Re-fetch data when limit changes

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://fakestoreapi.com/products?limit=${limit}`
        )
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch products")
        setLoading(false)
      }
    }
    fetchProducts()
  }, [limit])

  const handleSaveChanges = (updatedProduct) => {
    setProducts(
      products.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod
      )
    )
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setProducts(null)
  }

  const handleEditClick = (product) => {
    setEditProduct(product) // Set the product details in the state
    setShowEditModal(true) // Open the Edit Modal
  }

  const handleDeleteClick = (product) => {
    setDeleteProduct(product) // Set the product details in the state
    setShowDeleteModal(true) // Open the Delete Modal
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditProduct({
      ...editProduct,
      [name]: value,
    })
  }

  const handleViewClick = async (postId) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${postId}`
      )
      setModalProduct(response.data)
      setShowModal(true)
    } catch (err) {
      setError("Failed to fetch post details")
      console.error(err)
    }
  }

  // Function to render the table rows
  const renderTableRows = () => {
    return products.map((product) => (
      <tr key={product.id}>
        <td className="col-0">{product.id}</td>
        <td className="col-2">{product.title}</td>
        <td className="col-3">{product.description}</td>
        <td className="col-1">{product.category}</td>
        <td className="col-2">${product.price}</td>
        <td className="col-1">
          Rating: {product.rating.rate} (Total Ratings: {product.rating.count})
        </td>
        <td className="col-2">
          <Button
            variant="info"
            className="mx-1"
            onClick={() => handleViewClick(product.id)}
          >
            <FaEye />
          </Button>
          <Button
            variant="warning"
            className="mx-1"
            onClick={() => handleEditClick(product)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="danger"
            className="mx-1"
            onClick={() => handleDeleteClick(product)}
          >
            <FaTrash />
          </Button>
        </td>
      </tr>
    ))
  }

  // Display loading, error, or the table
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Show {limit} Products
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="" onClick={() => setLimit(5)}>
              5
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(10)}>
              10
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(15)}>
              15
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(20)}>
              20
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(25)}>
              25
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(50)}>
              50
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Search Input on the right */}
        <InputGroup style={{ width: "300px" }}>
          <FormControl
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="col-0">ID</th>
            <th className="col-2">Title</th>
            <th className="col-3">Description</th>
            <th className="col-1">Category</th>
            <th className="col-2">Price</th>
            <th className="col-1">Rating</th>
            <th className="col-2">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <ViewModal
        show={showModal}
        product={modalProduct}
        onClose={() => setShowModal(false)}
      ></ViewModal>
      {/* <EditModal
        show={showEditModal}
        product={editProduct}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChanges}
        onClose={() => setShowEditModal(false)}
      ></EditModal> */}
      <EditModal
        show={showEditModal}
        post={modalProduct}
        handleClose={handleCloseModal}
        handleSaveChanges={handleSaveChanges}
      />
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        selectedProduct={products}
      ></DeleteModal>
    </div>
  )
}

export default FakeApiProductTable_2
