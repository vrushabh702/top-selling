import React, { useState, useEffect } from "react"
import { Modal, Button, Form, Spinner, Dropdown, Card } from "react-bootstrap"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "../../userContext"

const ProfilePage = () => {
  const { user, setUser } = useUser()
  // Initial profile data from localStorage
  const [profileData, setProfileData] = useState({
    email: user?.email || "",
    password: user?.password || "",
    role: user?.role || "",
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  // UseEffect to get data from localStorage
  useEffect(() => {
    // const storedUserData = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setProfileData({
        email: user.email,
        password: user.password,
        role: user.role,
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleRoleChange = (role) => {
    setProfileData({ ...profileData, role })
  }

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleToggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible)
  }

  const handleToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const handleUpdatePassword = () => {
    // Check if the new password matches the confirm password
    if (newPassword === profileData.password) {
      if (newPassword === confirmPassword) {
        // Check if the new password is different from the current password
        setIsEditable(true)
        setShowModal(false)
        setNewPassword("")
        setConfirmPassword("")
        toast.success("Profile unlocked for editing!")
      } else {
        setError("New password cannot be the same as the current password!")
        toast.error("New password cannot be the same as the current password!")
      }
    } else {
      setError("Passwords do not match!")
      toast.error("Passwords do not match!")
    }
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate async request to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Profile updated successfully!")

      // Optionally save updated data to localStorage
      // localStorage.setItem("user", JSON.stringify(profileData))
      setUser(profileData)
      setIsEditable(false)
    } catch (err) {
      setError("Error updating profile")
      toast.error("Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Profile Page</h2>

      <Card className="p-4 shadow-sm">
        <Card.Body>
          {/* Error message */}
          {error && <div className="alert alert-danger">{error}</div>}

          <Form>
            {/* Email Input */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled={!isEditable}
                readOnly={!isEditable}
                className="mb-3"
              />
            </Form.Group>

            {/* Role Dropdown */}
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {profileData.role}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[
                    "admin",
                    "user",
                    "master",
                    "master admin",
                    "special user",
                  ].map((role) => (
                    <Dropdown.Item
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      disabled={!isEditable}
                    >
                      {role}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {/* Password Input */}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={profileData.password}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className="mr-2"
                />
                <Button
                  variant="link"
                  onClick={handleTogglePasswordVisibility}
                  disabled={!isEditable}
                  className="p-0"
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            {/* Update and Back buttons */}
            <div className="d-flex justify-content-between">
              <Button
                variant="primary"
                onClick={handleOpenModal}
                disabled={isEditable || loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Update"}
              </Button>

              <Button
                variant="secondary"
                // onClick={handleBackClick}
                disabled={loading}
              >
                Back
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={isNewPasswordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="link"
                  onClick={handleToggleNewPasswordVisibility}
                  className="p-0"
                >
                  {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <Button
                  variant="link"
                  onClick={handleToggleConfirmPasswordVisibility}
                  className="p-0"
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>
          </Form>

          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdatePassword}>
            Confirm Password
          </Button>
        </Modal.Footer>
      </Modal>

      {isEditable && !loading && (
        <Button variant="success" onClick={handleUpdateProfile}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Update Profile"
          )}
        </Button>
      )}
    </div>
  )
}

export default ProfilePage
