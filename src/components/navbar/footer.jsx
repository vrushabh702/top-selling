import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"

function Footer() {
  return (
    // <div className="d-flex flex-column min-vh-100">
    // <div>
    <div className="flex-grow-1">
      {/* Footer (this will always stay at the bottom) */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row className="d-flex justify-content-between align-items-center">
            {/* Left Side: "All rights reserved by Vrushabh" */}
            <Col className="text-start">
              <p>&copy; 2024 All Rights Reserved by Vrushabh</p>
            </Col>

            {/* Right Side: Social Media Icons */}
            <Col className="text-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="mailto:someone@example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaEnvelope size={20} />
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer
