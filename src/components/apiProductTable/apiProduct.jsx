import React from "react"
import { Col, Container, Row } from "react-bootstrap"

import Footer from "../navbar/footer"
import Sidebar from "../navbar/sidebar"
import Topbar from "../navbar/topbar"
import ApiProductTable from "./components/apiProductTable"

function ApiProducts() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main content layout with Sidebar and Content Area */}
      <div className="d-flex flex-row flex-grow-1">
        {/* Sidebar */}
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="col-xl-10 flex-grow-1">
          {/* Topbar */}
          <Topbar />

          {/* Main Content */}
          <Container>
            <Row>
              <Col>
                <h2 className="text-center text-primary">
                  Welcome to Api Called Products !
                </h2>
                {/* <TopSellingUsersTable /> */}
                <ApiProductTable></ApiProductTable>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default ApiProducts
