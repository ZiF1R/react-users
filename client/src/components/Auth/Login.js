import { useState } from 'react';
import {
  FormControl,
  Button,
  InputLabel,
  TextField,
  OutlinedInput,
  Alert,
} from '@mui/material';
import usersService from '../../services/users';
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login(props) {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  if (props.currentUser)
    return (
      <Alert severity="warning">You already authorized, to use this page you have to logout!</Alert>
    )

  const handleSubmit = (e) => {
    e.preventDefault();

    usersService
      .getUser({ mail, password })
      .then(response => {
        if (response.status === 200) {
          setMail("");
          setPassword("");

          props.setCurrentUser(response.data.user);
          navigate("/users");
        }
      })
      .catch((r) => {});
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__header">Login</h2>

      <TextField
        required
        type="email"
        size="small"
        name="mail"
        autoComplete="off"
        label="Enter email"
        variant="outlined"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />

      <FormControl required margin="normal" variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            name="password" 
          />
      </FormControl>

      <Button variant="contained" className="button_submit" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default Login;