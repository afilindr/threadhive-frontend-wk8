import { Card, Form, Button } from "react-bootstrap";
import './CommentForm.css';

export default function CommentForm({ commentText, onCommentChange, onPostComment, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPostComment) {
      onPostComment();
    }
  };

  return (
    <Card className="add-comment-section mb-4 border-0">
      <Card.Body>
        <h3 className="add-comment-title">Add a Comment</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="commentTextarea" className="mb-3">
            <Form.Label htmlFor="commentTextarea">Your Comment</Form.Label>
            <Form.Control
              id="commentTextarea"
              as="textarea"
              rows={4}
              placeholder="Write a comment..."
              value={commentText}
              onChange={onCommentChange}
              required
              className="comment-textarea"
              aria-describedby="comment-help"
            />
            <Form.Text id="comment-help" className="d-block mt-2">
              Share your thoughts on this thread
            </Form.Text>
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={disabled || !commentText?.trim()}
            className="post-comment-btn"
            aria-label="Submit your comment"
          >
            <i className="bi bi-pencil-square" aria-hidden="true"></i> Post Comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
