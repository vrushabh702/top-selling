import React from "react"
import "bootstrap/dist/css/bootstrap.min.css" // Import Bootstrap CSS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard"
import Login from "./components/login"
import PrivateRoute from "./components/Auth/privateRoute"
import Logout from "./components/Auth/logout"
import Products from "./components/products"
import NotFound from "./components/Auth/notFound"
import Users from "./components/users"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/products"
              element={<PrivateRoute element={<Products />} />}
            />
            <Route
              path="/users"
              element={<PrivateRoute element={<Users />} />}
            />
            <Route
              path="/*"
              element={<PrivateRoute element={<NotFound />} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
