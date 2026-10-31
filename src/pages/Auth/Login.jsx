import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../reducers/authSlice.js";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasNavigated = useRef(false);

  const { token, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (token && !hasNavigated.current) {
      hasNavigated.current = true;
      alert("Login successful!");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Container
      fluid
      className="auth-container d-flex align-items-center justify-content-center"
    >
      <Card className="auth-card shadow-lg border-0 rounded-4 p-4 p-md-5">
        <h1 className="auth-title">Login to ThreadHive</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Floating className="mb-4">
            <Form.Control
              id="floatingEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="auth-form-control"
              aria-describedby="email-help"
            />
            <label htmlFor="floatingEmail" className="auth-form-label">
              Email Address
            </label>
            <Form.Text id="email-help" className="mt-1">
              We'll never share your email
            </Form.Text>
          </Form.Floating>

          <Form.Floating className="mb-4">
            <Form.Control
              id="floatingPassword"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              required
              className="auth-form-control"
              aria-describedby="password-help"
            />
            <label htmlFor="floatingPassword" className="auth-form-label">
              Password
            </label>
            <Form.Text id="password-help" className="mt-1">
              Enter your secure password
            </Form.Text>
          </Form.Floating>

          {error && (
            <Alert variant="danger" role="alert" aria-live="polite">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="primary"
            className="auth-submit-btn"
            disabled={loading}
            aria-label="Submit login form"
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-label="Loading" />
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>Login
              </>
            )}
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <p className="mb-0 text-muted">
            Don't have an account? <a href="/register" className="text-primary">Register here</a>
          </p>
        </div>
      </Card>
    </Container>
  );
}

export default Login;
