import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Spinner, Button, Form } from "react-bootstrap"
import { FaEdit, FaEye, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa"
import CustomPagination from "../../reUseableComponents/pagination"
import ViewModal from "./Modal/viewModal"

const ApiProductTable = ({ hideActions }) => {
  // State to store data and loading state
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [searchQueryName, setSearchQueryName] = useState("")
  const [searchQueryPrice, setSearchQueryPrice] = useState("")

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Set the number of items per page

  // Fetch products data using Axios
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products")
      setProducts(response.data.products) // assuming the API response contains a 'products' array
    } catch (err) {
      setError("Error fetching data")
    } finally {
      setLoading(false)
    }
  }

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Sorting function
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    setSortConfig({ key, direction })

    const sortedData = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1
      return 0
    })

    setProducts(sortedData)
  }

  // // Filter function
  // const filterProducts = () => {
  //   return products.filter((product) => {
  //     const matchesName = product.name
  //       .toLowerCase()
  //       .includes(searchQueryName.toLowerCase())
  //     const matchesPrice = product.price.toString().includes(searchQueryPrice)
  //     return matchesName && matchesPrice
  //   })
  // }

  // Search input handlers
  const handleSearchNameChange = (event) => {
    setSearchQueryName(event.target.value)
  }

  const handleSearchPriceChange = (event) => {
    setSearchQueryPrice(event.target.value)
  }

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  // const filteredProducts = filterProducts()

  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleView = (product) => {
    setSelectedProduct(product) // Set selected product
    setShowViewModal(true) // Show the modal
  }

  // Loading and error handling
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning">Top Selling Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              className="bg-success text-light"
              onClick={() => handleSort("id")}
            >
              ID
              {sortConfig.key === "id" &&
                (sortConfig.direction === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
            </th>
            <th
              className="bg-success text-light"
              onClick={() => handleSort("name")}
            >
              Product Name
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
              <Form.Control
                type="text"
                placeholder="Search by name"
                className="mt-2"
                onChange={handleSearchNameChange}
                value={searchQueryName}
              />
            </th>
            <th
              className="bg-success text-light"
              onClick={() => handleSort("price")}
            >
              Price
              {sortConfig.key === "price" &&
                (sortConfig.direction === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
              <Form.Control
                type="text"
                placeholder="Search by price"
                className="mt-2"
                onChange={handleSearchPriceChange}
                value={searchQueryPrice}
              />
            </th>
            <th className="bg-success text-light">Rating</th>
            <th className="bg-success text-light">Stock</th>
            <th className="bg-success text-light">Category</th>
            <th className="bg-success text-light">Brand</th>
            {!hideActions && <th className="bg-success text-light">Action</th>}
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.rating}</td>
              <td>{product.stock} items remaining</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              {!hideActions && (
                <td className="col-2">
                  {/* Add action buttons if not hidden */}
                  <Button
                    variant="success"
                    className="m-2  "
                    onClick={() => handleView(product)}
                  >
                    <FaEye /> {/* Eye icon for view */}
                  </Button>
                  <Button variant="warning" className="m-2">
                    <FaEdit /> {/* Edit icon for update */}
                  </Button>

                  <Button variant="danger" className="m-2">
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <ViewModal
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        selectedProduct={selectedProduct}
      ></ViewModal>

      <CustomPagination
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ApiProductTable
