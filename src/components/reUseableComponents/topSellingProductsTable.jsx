import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Table,
  Spinner,
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { FaEdit, FaEye, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa"
import ViewModal from "../Modals/ViewModal"
import UpdateModal from "../Modals/updateModal"
import DeleteModal from "../Modals/deleteModal"
import CustomPagination from "./pagination"

const TopSellingProductsTable = ({ hideActions }) => {
  // State to store the data and loading state
  const [showModal, setShowModal] = useState(false)

  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchQueryName, setSearchQueryName] = useState("")
  const [searchQuerySkv, setSearchQuerySkv] = useState("")
  const [searchQueryPrice, setSearchQueryPrice] = useState("")

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4 // Adjust this based on how many items you want per page

  // Fetch data using Axios with async/await
  const fetchProducts = async () => {
    try {
      // Fetching the JSON data (assuming it's in the public folder)
      const response = await axios.get("../assets/api/topSelling.json")
      setProducts(response.data.topSellingProducts)
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

  // Filter function for each column
  const filterProducts = () => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchQueryName.toLowerCase())
      const matchesSkv = product.sky
        .toLowerCase()
        .includes(searchQuerySkv.toLowerCase())
      const matchesPrice = product.price.toString().includes(searchQueryPrice)

      return matchesName && matchesSkv && matchesPrice
    })
  }

  const handleSearchNameChange = (event) => {
    setSearchQueryName(event.target.value)
  }

  const handleSearchSkvChange = (event) => {
    setSearchQuerySkv(event.target.value)
  }

  const handleSearchPriceChange = (event) => {
    setSearchQueryPrice(event.target.value)
  }

  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const filteredProducts = filterProducts()

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Display a loading spinner while fetching data
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span>Loading...</span>
      </div>
    )
  }

  // Display error message if data fetch fails
  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>
  }

  const handleView = (product) => {
    setSelectedProduct(product) // Set selected product
    setShowViewModal(true) // Show modal
  }

  const updateProduct = (product) => {
    setSelectedProduct(product)
    setShowModal(true) // Show the update modal
  }

  const handleUpdate = (updatedProduct) => {
    // Here you would update the product, either in the state or through an API call
    console.log("Updated product:", updatedProduct)
    // Optionally, refresh the list or update the state after a successful update
  }

  const handleShowDeleteModal = (product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }
  const handleDelete = (product) => {
    // Simulate API call or state update
    // alert(`Deleting product: ${product.name}`)
    setProducts(products.filter((p) => p.SrNo !== product.SrNo))
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning"> Top Selling Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="">
            <th
              className="bg-success text-light"
              onClick={() => handleSort("SrNo")}
            >
              Sr No
              {sortConfig.key === "SrNo" &&
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
              Name
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
              <Form.Control
                type="text"
                placeholder="Search"
                className="mt-2"
                onChange={(e) => handleSearchNameChange(e, "name")}
                value={searchQueryName}
              />
            </th>
            <th
              className="bg-success text-light"
              onClick={() => handleSort("sky")}
            >
              Skv
              {sortConfig.key === "sky" &&
                (sortConfig.direction === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
              <Form.Control
                type="text"
                placeholder="Search"
                className="mt-2 "
                onChange={(e) => handleSearchSkvChange(e, "sky")}
                value={searchQuerySkv}
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
                placeholder="Search"
                className="mt-2"
                onChange={(e) => handleSearchPriceChange(e, "price")}
                value={searchQueryPrice}
              />
            </th>

            {!hideActions && <th className="bg-success text-light">Action</th>}
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.SrNo}>
              <td>{product.SrNo}</td>
              <td>{product.name}</td>
              <td>{product.sky}</td>
              <td>${product.price.toFixed(2)}</td>
              {!hideActions && (
                <td className="col-2">
                  {/* Replacing text buttons with icons */}
                  <Button
                    variant="success"
                    className="m-2"
                    onClick={() => handleView(product)}
                  >
                    <FaEye /> {/* Eye icon for view */}
                  </Button>
                  <Button
                    variant="warning"
                    className="m-2"
                    onClick={() => updateProduct(product)}
                  >
                    <FaEdit /> {/* Edit icon for update */}
                  </Button>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => handleShowDeleteModal(product)}
                  >
                    <FaTrash /> {/* Trash icon for delete */}
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal to display product details */}
      <ViewModal
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        selectedProduct={selectedProduct}
      ></ViewModal>

      <UpdateModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedProduct={selectedProduct}
        handleUpdate={handleUpdate}
      />

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        selectedProduct={selectedProduct}
        handleDelete={handleDelete}
      />

      <CustomPagination
        totalItems={filteredProducts.length} // Pass the total number of filtered products
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default TopSellingProductsTable
