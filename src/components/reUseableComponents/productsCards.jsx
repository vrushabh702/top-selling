import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, Button } from "react-bootstrap"

function ProductCard() {
  const [product, setProduct] = useState(null) // State to hold product data
  const [loading, setLoading] = useState(true) // State for loading
  const [error, setError] = useState(null) // State for errors

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Assuming you have an API endpoint to fetch product data
        const response = await axios.get("../assets/api/topSelling.json") // Replace with your API URL
        setProduct(response.data.topSellingProducts)
        console.log("response", response.data.topSellingProducts) // Set the product data into state
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        setError("Failed to fetch data") // Set error if fetch fails
        setLoading(false) // Set loading to false after failure
      }
    }

    fetchProduct() // Call the async function to fetch data
  }, []) // Empty dependency array, fetch only once when component mounts

  // Function to handle delete
  const handleDelete = () => {
    alert(`Product ${product.name} deleted!`)
    // Add delete logic (e.g., make a DELETE request with Axios)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Card style={{ width: "18rem", margin: "20px" }}>
      {/* <Card.Img
        variant="top"
        src="https://via.placeholder.com/150" // Placeholder image URL
        alt={product.name}
      /> */}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.sky}</Card.Subtitle>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Button
          variant="success"
          size="sm"
          onClick={() => alert("Viewing product")}
        >
          View
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          className="ml-2"
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
