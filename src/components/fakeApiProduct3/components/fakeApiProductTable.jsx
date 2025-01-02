import React, { useState, useEffect, useMemo } from "react"
import axios from "axios"
import {
  FaTruckLoading,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa"
import { Table, Button, Spinner, Dropdown, Form } from "react-bootstrap"
import ViewModal from "../Modals/viewModal"
import EditModal from "../Modals/editModal"
import DeleteModal from "../Modals/deleteModal"

const FakeProductTable3 = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dynamicLimit, setDynamicLimit] = useState(5) // Can change this dynamically
  const [searchQuery, setSearchQuery] = useState("") // State for search query
  const [sortConfig, setSortConfig] = useState({
    key: "id", // Default sort by 'id'
    direction: "asc", // Default direction is ascending
  })

  const [showModal, setShowModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Function to fetch and filter products
  const fetchProducts = async (queryString = "") => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products${queryString}`
      )
      setProducts(response.data)
    } catch (err) {
      setError("Error fetching products")
    } finally {
      setLoading(false)
    }
  }

  // Build query string dynamically based on limit and sortConfig
  const buildQueryString = () => {
    let queryString = ""

    // Add limit to the query string if it's defined
    if (dynamicLimit) {
      queryString += `?limit=${dynamicLimit}`
    }

    // Add sorting to the query string if sorting is configured
    if (sortConfig.key) {
      if (queryString) {
        queryString += `&sort=${sortConfig.direction}&key=${sortConfig.key}`
      } else {
        queryString += `?sort=${sortConfig.direction}&key=${sortConfig.key}`
      }
    }

    return queryString
  }

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setDynamicLimit(newLimit)
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Handle sort change (ascending or descending)
  const handleSortChange = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc" // Toggle direction
    }

    setSortConfig({ key, direction })
  }

  // added for fitler after updated value
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] < b[sortConfig.key] ? -1 : 1
      }
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1
    })
  }, [filteredProducts, sortConfig])
  console.log("sortedProducts ", sortedProducts)

  // Effect to fetch products whenever dynamicLimit, sortConfig, or searchQuery changes
  useEffect(() => {
    const queryString = buildQueryString()
    console.log("Fetching products with query:", queryString)

    fetchProducts(queryString)
  }, [dynamicLimit, sortConfig]) // Depend on limit and sort

  // Effect to filter products based on search query and search the `products` state
  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredProducts(products) // Reset filter when search is cleared
    }
  }, [searchQuery, products])

  const handleView = (id) => {
    setSelectedProductId(id)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProductId(null)
  }

  const handleEditClick = (productId) => {
    setSelectedProductId(productId)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => setShowEditModal(false)

  // const handleUpdateProduct = (product) => {
  const handleUpdateProduct = (updatedProductData) => {
    // setUpdatedProduct(product)

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProductData.id
          ? { ...product, ...updatedProductData } // This merges the updated data
          : product
      )
    )
    setUpdatedProduct(updatedProductData)
  }

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId)
    setShowDeleteModal(true) // Show delete modal
  }

  const handleDeleteConfirm = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    )
  }

  return (
    <div className="container mt-5">
      {/* Search Box */}
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by product title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Limit and Sort Controls */}
      <div className="d-flex justify-content-between mb-3">
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Show {dynamicLimit} Posts
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleLimitChange(5)}>
              5
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLimitChange(10)}>
              10
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLimitChange(15)}>
              15
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLimitChange(20)}>
              20
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLimitChange(25)}>
              25
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLimitChange(50)}>
              50
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <h3>
            Loading Products <FaTruckLoading />
          </h3>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger">
          <strong>Error: </strong> {error}
        </div>
      )}

      {/* Table displaying products */}
      {!loading && !error && filteredProducts.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th
                onClick={() => handleSortChange("id")}
                style={{ cursor: "pointer" }}
              >
                ID
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  ))}
              </th>
              <th
                onClick={() => handleSortChange("title")}
                style={{ cursor: "pointer" }}
              >
                Title
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  ))}
              </th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.slice(0, dynamicLimit).map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description.slice(0, 50)}...</td>
                <td>{product.category}</td>
                <td>
                  {product.rating.rate} ({product.rating.count} reviews)
                </td>
                <td>
                  <Button variant="info" onClick={() => handleView(product.id)}>
                    <FaEye /> {/* Eye icon for view */}
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(product.id)}
                    className="mx-2"
                  >
                    <FaEdit /> {/* Edit icon for update */}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    <FaTrash /> {/* Trash icon for delete */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ViewModal
        show={showModal}
        handleClose={handleCloseModal}
        productId={selectedProductId}
      />

      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        productId={selectedProductId}
        handleUpdateProduct={handleUpdateProduct}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        productId={selectedProductId}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default FakeProductTable3
