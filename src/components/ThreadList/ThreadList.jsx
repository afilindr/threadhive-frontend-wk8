import { useDispatch } from "react-redux";
import {
  upvoteThreadThunk,
  downvoteThreadThunk,
} from "../../reducers/threadListSlice";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import VoteButtons from "../Shared/VoteButtons";
import "./ThreadList.css";

export default function ThreadList({ threadsToDisplay }) {
  const dispatch = useDispatch();

  const handleUpvote = (threadId) => {
    dispatch(upvoteThreadThunk(threadId));
  };

  const handleDownvote = (threadId) => {
    dispatch(downvoteThreadThunk(threadId));
  };

  return (
    <Container fluid className="px-0">
      {threadsToDisplay.map((thread) => (
        <article key={thread._id} className="thread-card">
          <div className="thread-card-body">
            <div className="vote-section">
              <VoteButtons
                count={thread.voteCount}
                onUpvote={() => handleUpvote(thread._id)}
                onDownvote={() => handleDownvote(thread._id)}
                ariaLabel={`thread "${thread.title}"`}
              />
            </div>

            <div className="thread-content-section">
              <div className="thread-header">
                <h3 className="thread-title">{thread.title}</h3>
                <span className="subreddit-badge" aria-label={`Community: r/${thread.subreddit?.name || "unknown"}`}>
                  r/{thread.subreddit?.name || "unknown"}
                </span>
              </div>
              <p className="thread-text">{thread.content}</p>
              <Link to={`/thread/${thread._id}`} className="view-thread-btn" aria-label={`View comments for "${thread.title}"`}>
                <i className="bi bi-chat-left-text" aria-hidden="true"></i> View Comments
              </Link>
            </div>
          </div>
        </article>
      ))}
    </Container>
  );
}
