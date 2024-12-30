import axios from "axios"
import React, { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { FaBox, FaClipboardList, FaDollarSign } from "react-icons/fa"

const DashboardCards = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  // Fetch data using Axios with async/await
  const fetchProducts = async () => {
    try {
      // Fetching the JSON data (assuming it's in the public folder)
      const response = await axios.get("../assets/api/topSelling.json")
      setProducts(response.data.topSellingProducts)
      const total = response.data.topSellingProducts.reduce(
        (acc, product) => {
          acc.price += product.price // Assuming 'price' is a field in each product
          acc.items += 1
          return acc
        },
        { price: 0, items: 0 }
      )
      setTotalPrice(total.price)
      setTotalItems(total.items)
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

  return (
    <div>
      <Row className="mt-4">
        <Col md={4}>
          <Card bg="light" className="mb-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-info">Total Sales</h2>
                <h5 className="text-warning mt-4 ">This Month</h5>
              </div>
              <div>
                <h3 className="text-danger mb-3">
                  <FaDollarSign /> Sales
                </h3>
                <h3 className="text-success">${totalPrice.toFixed(2)}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="light" className="mb-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-info">Total Orders</h2>
                <h5 className="text-warning mt-4">This Month</h5>
              </div>
              <div>
                <h3 className="text-success">{totalItems}</h3>
                <h3 className="text-danger mt-3 mt-3">
                  <FaClipboardList /> Orders
                </h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="light" className="mb-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-info">Total Products</h2>
                <h5 className="text-warning mt-4">In Stock</h5>
              </div>
              <div>
                <h3 className="text-danger mb-3">
                  <FaBox /> Products
                </h3>
                <h3 className="text-success">{products.length}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardCards
