const express = require("express");
const app = express();
const port = 3001;

const users = [
  {
    name: "test1",
    mail: "test1@mail.ru",
    password: "123456",
    isBlocked: false
  },
  {
    name: "test2",
    mail: "test2@mail.ru",
    password: "123456",
    isBlocked: false
  },
  {
    name: "test3",
    mail: "test3@mail.ru",
    password: "123456",
    isBlocked: false
  },
  {
    name: "test4",
    mail: "test4@mail.ru",
    password: "123456",
    isBlocked: false
  },
];

app.get('/api/users', (req, res) => {
  res.json({ "users": users });
});

app.post("/api/users?:q", (req, res) => {
  console.log("123", req.params.q)
});

app.listen(port, () => console.log(`React-users app listening on http://localhost:${port}`));