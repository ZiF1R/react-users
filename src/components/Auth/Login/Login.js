import { Form, Button } from 'react-bootstrap';
import "./Login.css";

function Login() {
  return (
    <div className="form-container">
      <Form className="auth-form">
        <h2 className="auth-form__header">Login</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            <span>Have no account? </span>
            <a href="/signup">Sign Up!</a>
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;