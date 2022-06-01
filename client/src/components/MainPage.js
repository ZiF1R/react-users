import { Outlet } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import "./MainPage.css";
import { useState } from 'react';

function MainPage() {
  const [token, setToken] = useState();

  return (
    <>
      <Navbar bg="light" sticky="top" variant="light">
        <Container>
        <Navbar.Brand href="/">React users</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link disabled={token === undefined} href="/users">Users</Nav.Link>
          <Nav.Link href="/sign-in">Sign in</Nav.Link>
          <Nav.Link href="/sign-up">Sign up</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <main className="main-container">
        <Outlet />
      </main>
    </>
  )
}

export default MainPage;