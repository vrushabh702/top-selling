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
import { ToastContainer } from "react-toastify"
import Chat from "./components/chat/chat"
import ChatBox from "./components/chatbox"
import ApiProducts from "./components/apiProductTable/apiProduct"
import FakeApiProduct from "./components/fakeApiProduct/fakeApiProduct"
import FakeApiProduct_2 from "./components/fakeApiProduct_2/fakeApiProduct_2"
import FakeApiProduct3 from "./components/fakeApiProduct3/fakeApiProduct3"
import ProfilePage from "./components/profile/components/profilePage"
import Profile from "./components/profile/profile"
import { UserProvider } from "./components/userContext"

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UserProvider>
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
                path="/apiProducts"
                element={<PrivateRoute element={<ApiProducts />} />}
              />
              <Route
                path="/fakerApiProduct"
                element={<PrivateRoute element={<FakeApiProduct />} />}
              />
              <Route
                path="/fakerApiProduct_2"
                element={<PrivateRoute element={<FakeApiProduct3 />} />}
              />
              <Route
                path="/users"
                element={<PrivateRoute element={<Users />} />}
              />
              <Route
                path="/chat"
                element={<PrivateRoute element={<ChatBox />} />}
              />
              <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path="/*"
                element={<PrivateRoute element={<NotFound />} />}
              />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
