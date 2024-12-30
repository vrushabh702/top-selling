import React from "react"
import { Nav } from "react-bootstrap"

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column p-3 bg-light"
      style={{ height: "100vh" }}
    >
      <h4 className="text-center mb-4">
        <img
          src="../assets/images/logo.png"
          alt="logo"
          width="40"
          height="40"
        />
      </h4>
      <Nav className="flex-column">
        <Nav.Link href="/" className="btn btn-light mb-2 w-100">
          Dashboard
        </Nav.Link>
        <Nav.Link href="#products" className="btn btn-light mb-2 w-100">
          Products
        </Nav.Link>
        <Nav.Link href="#users" className="btn btn-light mb-2 w-100">
          Users
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default Sidebar
