import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Topbar from "../navbar/topbar"
import Sidebar from "../navbar/sidebar"
import Footer from "../navbar/footer"
import PostTable from "./components/fakeApiProductTable"

function FakeApiProduct() {
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
                  Welcome to FAKE API PRODUCT !
                </h2>
                {/* <TopSellingUsersTable /> */}
                <PostTable></PostTable>
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

export default FakeApiProduct
