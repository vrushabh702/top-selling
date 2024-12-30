import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Spinner } from "react-bootstrap"

const TopSellingProductsTable = () => {
  // State to store the data and loading state
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

  return (
    <div className="container mt-4">
      <h2>Top Selling Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Skv</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.SrNo}>
              <td>{product.SrNo}</td>
              <td>{product.name}</td>
              <td>{product.sky}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TopSellingProductsTable
