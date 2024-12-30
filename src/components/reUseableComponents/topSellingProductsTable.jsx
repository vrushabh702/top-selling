import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Spinner, Button, Modal } from "react-bootstrap"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"
import ViewModal from "../Modals/ViewModal"
import UpdateModal from "../Modals/updateModal"

const TopSellingProductsTable = ({ hideActions }) => {
  // State to store the data and loading state
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const deleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      alert(`Deleting product: ${product.name}`)
      // Here you would usually call an API to delete the product
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning"> Top Selling Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="">
            <th className="bg-success text-light">Sr No</th>
            <th className="bg-success text-light">Name</th>
            <th className="bg-success text-light">Skv</th>
            <th className="bg-success text-light"> Price</th>
            {!hideActions && <th className="bg-success text-light">Action</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
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
                    onClick={() => deleteProduct(product)}
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
    </div>
  )
}

export default TopSellingProductsTable
