import React, { useEffect, useState } from "react"
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

  // Function to fetch products with sorting
  const fetchProducts = async (queryString = "") => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products${queryString}`
      )
      setProducts(response.data)
      setFilteredProducts(response.data) // Initially, set all products as filtered
    } catch (err) {
      setError("Error fetching products")
    } finally {
      setLoading(false)
    }
  }

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setDynamicLimit(newLimit)
    fetchProducts(`?limit=${newLimit}`)
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Filter products based on search query
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

  // Handle sort change (ascending or descending)
  const handleSortChange = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc" // Toggle direction
    }

    setSortConfig({ key, direction })
    fetchProducts(`?sort=${direction}&key=${key}`)
  }

  // Handle action for each product
  const handleView = (id) => {
    alert(`View product with id: ${id}`)
  }

  const handleUpdate = (id) => {
    alert(`Update product with id: ${id}`)
  }

  const handleDelete = (id) => {
    alert(`Delete product with id: ${id}`)
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
            {filteredProducts.slice(0, dynamicLimit).map((product) => (
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
                    onClick={() => handleUpdate(product.id)}
                    className="mx-2"
                  >
                    <FaEdit /> {/* Edit icon for update */}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash /> {/* Trash icon for delete */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default FakeProductTable3
