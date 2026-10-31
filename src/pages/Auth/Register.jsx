import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthState } from '../../reducers/authSlice.js';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registrationSuccess } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(form));
  };

  useEffect(() => {
    if (registrationSuccess) {
      alert('Registration successful!');
      dispatch(clearAuthState());
      navigate('/login');
    }
  }, [registrationSuccess, dispatch, navigate]);

  return (
    <Container
      fluid
      className="auth-container d-flex align-items-center justify-content-center py-5"
    >
      <Card className="auth-card shadow-lg border-0 rounded-4 p-4 p-md-5">
        <h1 className="auth-title">Create Your ThreadHive Account</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Floating className="mb-4">
            <Form.Control
              id="floatingName"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder=" "
              required
              className="auth-form-control"
              aria-describedby="name-help"
            />
            <label htmlFor="floatingName" className="auth-form-label">Full Name</label>
            <Form.Text id="name-help" className="mt-1">
              This will be your display name
            </Form.Text>
          </Form.Floating>

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
              aria-describedby="reg-email-help"
            />
            <label htmlFor="floatingEmail" className="auth-form-label">Email Address</label>
            <Form.Text id="reg-email-help" className="mt-1">
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
              aria-describedby="reg-password-help"
            />
            <label htmlFor="floatingPassword" className="auth-form-label">Password</label>
            <Form.Text id="reg-password-help" className="mt-1">
              Choose a strong password
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
            aria-label="Submit registration form"
          >
            {loading ? (
              <Spinner animation="border" size="sm" role="status" aria-label="Loading" />
            ) : (
              <>
                <i className="bi bi-person-plus-fill me-2" aria-hidden="true"></i>Register
              </>
            )}
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <p className="mb-0 text-muted">
            Already have an account? <a href="/login" className="text-primary">Login here</a>
          </p>
        </div>
      </Card>
    </Container>
  );
}

export default Register;
