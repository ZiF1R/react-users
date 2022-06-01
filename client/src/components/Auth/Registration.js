import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./Auth.css";

function Registration() {
  const [name, setName] = useState(""),
    [mail, setMail] = useState(""),
    [password, setPassword] = useState("");

  function submit() {
    fetch(`/api/users?name=${name}&mail=${mail}&password=${password}`);
  }

  return (
    <Form className="auth-form" onSubmit={() => submit()}>
      <h2 className="auth-form__header">Registration</h2>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} name="name" required type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={mail} onChange={(e) => setMail(e.target.value)} name="mail" required type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} name="password" required type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Registration;