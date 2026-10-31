import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThreadThunk } from "../../reducers/threadListSlice";
import {
  fetchSubreddits as fetchSubredditsThunk,
  createSubreddit as createSubredditThunk,
} from "../../reducers/subredditSlice";
import { Form } from "react-bootstrap";
import "./CreateThreadForm.css";

export default function CreateThreadForm({ onClose }) {
  const dispatch = useDispatch();
  const { subreddits } = useSelector((state) => state.subreddits);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subredditId, setSubredditId] = useState("");
  const [newSubredditName, setNewSubredditName] = useState("");
  const [newSubredditDescription, setNewSubredditDescription] = useState("");

  useEffect(() => {
    dispatch(fetchSubredditsThunk());
  }, [dispatch]);

  const handleNewSubredditChange = (value) => {
    setNewSubredditName(value);
    if (value.trim()) {
      setSubredditId("");
    }
  };

  const handleSubredditSelect = (value) => {
    setSubredditId(value);
    if (value) {
      setNewSubredditName("");
      setNewSubredditDescription("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let subredditToUse = subredditId;

    // Create new subreddit first if needed
    if (newSubredditName.trim()) {
      if (!newSubredditDescription.trim()) {
        alert("Please provide a description for the new community.");
        return;
      }

      const resultAction = await dispatch(
        createSubredditThunk({
          name: newSubredditName,
          description: newSubredditDescription,
        }),
      );

      if (createSubredditThunk.fulfilled.match(resultAction)) {
        subredditToUse = resultAction.payload._id;
        setSubredditId(resultAction.payload._id);
      } else {
        alert("Failed to create community. Please try again.");
        return;
      }
    }

    if (!subredditToUse) {
      alert("Please select or create a community before posting.");
      return;
    }

    // Use Redux to create thread
    const resultAction = await dispatch(
      createThreadThunk({
        title,
        content,
        subreddit: subredditToUse,
      }),
    );

    if (createThreadThunk.fulfilled.match(resultAction)) {
      onClose();
    } else {
      alert("Failed to create thread. Please try again.");
    }
  };

  return (
    <div className="create-thread-form px-0">
      <h2 className="form-title">
        <i className="bi bi-pencil-square" aria-hidden="true"></i> Create New Thread
      </h2>
      <Form onSubmit={handleSubmit}>
        <div className="form-group-custom">
          <label className="form-label-custom" htmlFor="thread-title">Thread Title</label>
          <input
            id="thread-title"
            type="text"
            className="form-control-custom"
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-describedby="title-help"
          />
          <Form.Text id="title-help" className="d-block mt-1 small">
            Give your thread a clear, descriptive title
          </Form.Text>
        </div>

        <div className="form-group-custom">
          <label className="form-label-custom" htmlFor="thread-content">Content</label>
          <textarea
            id="thread-content"
            className="form-control-custom form-textarea-custom"
            rows={4}
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            aria-describedby="content-help"
          />
          <Form.Text id="content-help" className="d-block mt-1 small">
            Provide detailed content for your thread
          </Form.Text>
        </div>

        <div className="form-group-custom">
          <label className="form-label-custom" htmlFor="subreddit-select">Community</label>
          {subreddits.length > 0 ? (
            <select
              id="subreddit-select"
              className="form-control-custom"
              value={subredditId}
              onChange={(e) => handleSubredditSelect(e.target.value)}
              disabled={!!newSubredditName.trim()}
              aria-describedby="subreddit-help"
            >
              <option value="">Select a community</option>
              {subreddits.map((sr) => (
                <option key={sr._id} value={sr._id}>
                  r/{sr.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="form-hint">No communities found.</p>
          )}
          <Form.Text id="subreddit-help" className="d-block mt-1 small">
            Choose an existing community for your thread
          </Form.Text>

          <fieldset className="new-subreddit-section mt-3">
            <legend className="form-label-custom mb-2">
              Or Create New Community
            </legend>
            <input
              type="text"
              className="form-control-custom mb-2"
              placeholder={
                subredditId
                  ? "Deselect above to create new"
                  : "Enter community name"
              }
              value={newSubredditName}
              onChange={(e) => handleNewSubredditChange(e.target.value)}
              disabled={!!subredditId}
              aria-describedby="new-subreddit-help"
            />
            <Form.Text id="new-subreddit-help" className="d-block mt-1 small">
              Create a new community for your thread
            </Form.Text>
            {newSubredditName && !subredditId && (
              <textarea
                className="form-control-custom"
                rows={2}
                placeholder="Describe your community"
                value={newSubredditDescription}
                onChange={(e) => setNewSubredditDescription(e.target.value)}
                required
                aria-label="Community description"
              />
            )}
          </fieldset>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-btn form-btn-primary">
            <i className="bi bi-pencil-square" aria-hidden="true"></i> Post Thread
          </button>
          <button
            type="button"
            className="form-btn form-btn-secondary"
            onClick={onClose}
            aria-label="Close create thread form"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
