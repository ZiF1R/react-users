import { Table, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
// import Login from "../components/Auth/Login";

function UsersPage() {
  const [backendData, setBackendData] = useState([{}]);
  const [selection, setSelection] = useState(false);
  // const [token, setToken] = useState();

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        setBackendData(data)
      });
  }, []);

  // if (!token)
  //   return <Login setToken={setToken} />

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th><Form.Check onChange={() => setSelection(!selection)}/></th>
          <th>#</th>
          <th>Name</th>
          <th>Mail</th>
          <th>Blocked</th>
        </tr>
      </thead>
      <tbody>
      {
          (typeof backendData.users === 'undefined') ?
            (
                  <tr>
                    <td><Form.Check/></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
            ) :
            (
              backendData.users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td><Form.Check checked={selection} /></td>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.mail}</td>
                    <td>{user.isBlocked ? "true" : "false"}</td>
                  </tr>
                )
              })
            )
      }
      </tbody>
    </Table>
  );
}

export default UsersPage;