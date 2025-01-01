import React from "react"
import { Button, Card, Col, Modal, Row, Spinner } from "react-bootstrap"
import { FaComment, FaThumbsUp } from "react-icons/fa"

const ViewModal = ({ show, post, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{post ? post.title : ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {post ? (
          <Row>
            <Col md={6}>
              <Card className="shadow-sm bg-light">
                <Card.Body>
                  <h5 className="text-success">
                    <FaThumbsUp /> {post.likes} Likes
                  </h5>
                  <p className="mt-3">
                    <strong>Author:</strong> {post.author}
                  </p>
                  <p className="mt-3">
                    <strong>Content:</strong> {post.content}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-between">
              <Card className="shadow-sm bg-light">
                <Card.Body>
                  <h5 className="text-success">
                    <FaComment /> Comments ({post.comments.length})
                  </h5>
                  <ul className="list-unstyled">
                    {post.comments.map((comment) => (
                      <li key={comment.id} className="mb-3">
                        <Card className="border-info shadow-sm">
                          <Card.Body>
                            <div className="d-flex align-items-center">
                              <FaComment className="mr-2 text-info" />
                              <strong>{comment.author}</strong>
                            </div>
                            <p>{comment.text}</p>
                          </Card.Body>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Spinner animation="border" />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewModal
