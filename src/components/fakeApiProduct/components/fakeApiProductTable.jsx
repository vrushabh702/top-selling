import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Table,
  Button,
  Spinner,
  Dropdown,
  Modal,
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap"
import { FaEye, FaEdit, FaTrash, FaThumbsUp, FaComment } from "react-icons/fa"
import ViewModal from "../Modals/viewModal"

const PostTable = () => {
  // State variables
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [modalPost, setModalPost] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetching data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://www.freetestapi.com/api/v1/posts"
        )
        setPosts(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch posts")
        console.error(err)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Fetching data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://www.freetestapi.com/api/v1/posts?limit=${limit}`
        )
        setPosts(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch posts")
        console.error(err)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit]) // Re-fetch data when limit changes

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() !== "") {
        try {
          const response = await axios.get(
            `https://www.freetestapi.com/api/v1/posts?search=${searchQuery}`
          )
          setPosts(response.data) // Assuming the users API will return posts (adjust as needed)
        } catch (err) {
          setError("Failed to fetch posts")
          console.error(err)
        }
      } else {
        setPosts([]) // Clear posts if search query is empty
      }
    }

    if (searchQuery) {
      fetchUsers()
    } else {
      // Optionally, call API to fetch all posts when search query is empty
    }
  }, [searchQuery])

  const handleViewClick = async (postId) => {
    try {
      const response = await axios.get(
        `https://www.freetestapi.com/api/v1/posts/${postId}`
      )
      setModalPost(response.data)
      setShowModal(true)
    } catch (err) {
      setError("Failed to fetch post details")
      console.error(err)
    }
  }

  // Function to render the table rows
  const renderTableRows = () => {
    return posts.map((post) => (
      <tr key={post.id}>
        <td className="col-0">{post.id}</td>
        <td className="col-2">{post.title}</td>
        <td className="col-3">{post.content}</td>
        <td className="col-1">{post.author}</td>
        <td className="col-2">{new Date(post.timestamp).toLocaleString()}</td>
        <td className="col-1">{post.likes}</td>
        <td className="col-1">{post.comments.length}</td>
        <td className="col-2">
          <Button
            variant="info"
            className="mx-1"
            onClick={() => handleViewClick(post.id)}
          >
            <FaEye />
          </Button>
          <Button variant="warning" className="mx-1">
            <FaEdit />
          </Button>
          <Button variant="danger" className="mx-1">
            <FaTrash />
          </Button>
        </td>
      </tr>
    ))
  }

  // Display loading, error, or the table
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Show {limit} Posts
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="" onClick={() => setLimit(5)}>
              5
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(10)}>
              10
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(15)}>
              15
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(20)}>
              20
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(25)}>
              25
            </Dropdown.Item>
            <Dropdown.Item className="" onClick={() => setLimit(50)}>
              50
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Search Input on the right */}
        <InputGroup style={{ width: "300px" }}>
          <FormControl
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="col-0">ID</th>
            <th className="col-2">Title</th>
            <th className="col-3">Content</th>
            <th className="col-1">Author</th>
            <th className="col-2">Timestamp</th>
            <th className="col-1">Likes</th>
            <th className="col-1">Comments</th>
            <th className="col-2">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <ViewModal
        show={showModal}
        post={modalPost}
        onClose={() => setShowModal(false)}
      ></ViewModal>
    </div>
  )
}

export default PostTable
