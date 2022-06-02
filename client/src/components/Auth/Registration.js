import { useState } from 'react';
import { FormControl, Button, TextField, InputLabel, OutlinedInput } from '@mui/material';
import usersService from '../../services/users';
import "./Auth.css";

function Registration() {
  const [name, setName] = useState(""),
    [mail, setMail] = useState(""),
    [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    usersService
      .addUser({ name, mail, password })
      .then(response => {
        if (response.status === 200) {
          setName("");
          setMail("");
          setPassword("");
        }
      });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__header">Registration</h2>

      <TextField
        required
        margin="normal"
        type="text"
        size="small"
        name="name"
        autoComplete="off"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        required
        margin="normal"
        type="email"
        size="small"
        name="mail"
        autoComplete="off"
        label="Enter email"
        variant="outlined"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />

      <FormControl margin="normal" variant="outlined" size="small" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
          />
      </FormControl>

      <Button variant="contained" className="button_submit" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default Registration;