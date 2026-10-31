import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import {
  downvoteCommentThunk,
  upvoteCommentThunk,
} from "../../reducers/commentSlice.js";
import "./CommentList.css";

export default function CommentList() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  const handleUpvote = (commentId) => {
    dispatch(upvoteCommentThunk(commentId));
  };

  const handleDownvote = (commentId) => {
    dispatch(downvoteCommentThunk(commentId));
  };

  return (
    <div className="d-flex flex-column gap-3">
      {comments.map((comment) => {
        return (
          <article key={comment._id} className="comment-card">
            <Card className="border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="comment-avatar" aria-hidden="true">
                      {(comment.user?.name ?? "U")[0].toUpperCase()}
                    </div>
                    <span className="comment-author">
                      {comment.user?.name ?? "Unknown"}
                    </span>
                  </div>
                  <span className="badge comment-badge">
                    <i className="bi bi-chat-left-text" aria-hidden="true"></i>
                    Comment
                  </span>
                </div>

                <p className="comment-content">{comment.content}</p>

                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleUpvote(comment._id)}
                    aria-label={`Upvote comment by ${comment.user?.name ?? "Unknown"}`}
                    className="comment-vote-btn"
                    title="Upvote this comment"
                  >
                    <i className="bi bi-arrow-up" aria-hidden="true"></i>
                  </Button>
                  <span className="comment-vote-count" role="status" aria-live="polite" aria-label={`Vote count: ${comment.voteCount ?? 0}`}>
                    {comment.voteCount ?? 0}
                  </span>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleDownvote(comment._id)}
                    aria-label={`Downvote comment by ${comment.user?.name ?? "Unknown"}`}
                    className="comment-vote-btn"
                    title="Downvote this comment"
                  >
                    <i className="bi bi-arrow-down" aria-hidden="true"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </article>
        );
      })}
    </div>
  );
}
