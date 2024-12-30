import React from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import Sidebar from "./navbar/sidebar"
import Topbar from "./navbar/topbar"
import Footer from "./navbar/footer"
import TopSellingProductsTable from "./reUseableComponents/topSellingProductsTable"
import DashboardCards from "./reUseableComponents/dashboardCards"

function Dashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main content layout with Sidebar and Content Area */}
      <div className="d-flex flex-row">
        {/* Sidebar */}
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1">
          {/* Topbar */}
          <Topbar />

          {/* Main Content */}
          <Container>
            <h1 className="text-center text-danger">
              Welcome to the Dashboard!
            </h1>

            <DashboardCards></DashboardCards>
            <Row>
              <Col>
                <TopSellingProductsTable hideActions={true} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Dashboard
