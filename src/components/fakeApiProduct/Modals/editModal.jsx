import React from "react"
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap"
import { FaComment, FaThumbsUp } from "react-icons/fa"

const EditModal = ({
  show,
  post,
  handleInputChange,
  handleSaveChanges,
  onClose,
}) => {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Title</InputGroup.Text>
          <FormControl
            name="title"
            value={post.title || ""}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Content</InputGroup.Text>
          <FormControl
            as="textarea"
            rows={3}
            name="content"
            value={post.content || ""}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Author</InputGroup.Text>
          <FormControl
            name="author"
            value={post.author || ""}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Timestamp</InputGroup.Text>
          <FormControl
            disabled
            value={new Date(post.timestamp).toLocaleString()}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
