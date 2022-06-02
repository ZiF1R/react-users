const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
var cors = require('cors');

let users = [
  // {
  //   id: 0,
  //   name: "test1",
  //   mail: "test1@mail.ru",
  //   password: "123456",
  //   status: "Blocked",
  //   createdDate: new Date().toDateString() + " " + new Date().toTimeString(),
  //   lastVisit: new Date().toDateString() + " " + new Date().toTimeString(),
  // },
  // {
  //   id: 1,
  //   name: "test2",
  //   mail: "test2@mail.ru",
  //   password: "123456",
  //   status: "",
  //   createdDate: new Date().toDateString() + " " + new Date().toTimeString(),
  //   lastVisit: new Date().toDateString() + " " + new Date().toTimeString(),
  // },
  // {
  //   id: 2,
  //   name: "test3",
  //   mail: "test3@mail.ru",
  //   password: "123456",
  //   status: "",
  //   createdDate: new Date().toDateString() + " " + new Date().toTimeString(),
  //   lastVisit: new Date().toDateString() + " " + new Date().toTimeString(),
  // },
  // {
  //   id: 3,
  //   name: "test4",
  //   mail: "test4@mail.ru",
  //   password: "123456",
  //   status: "Blocked",
  //   createdDate: new Date().toDateString() + " " + new Date().toTimeString(),
  //   lastVisit: new Date().toDateString() + " " + new Date().toTimeString(),
  // },
];

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  console.log("get");

  if (req.query.mail) {
    const {mail, password} = req.query;

    const matchedUsers = users.filter(user => user.mail === mail && user.password === password);
    if (matchedUsers.length > 0) {
      const user = matchedUsers[0];

      const lastVisit = new Date();
      const date = lastVisit.toDateString();
      const time = `${lastVisit.getHours()}:${lastVisit.getMinutes()}:${lastVisit.getSeconds()}`;

      user.lastVisit = `${date}, ${time}`;
      res.json({ "user": user });
    } else {
      res.status(400).json({});
    }
  }
  else {
    res.json({ "users": users });
  }
});

app.post("/api/users", (req, res) => {
  console.log("post");
  const { name, mail, password } = req.body;

  const createdDate = new Date();
  const date = createdDate.toDateString();
  const time = `${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`;

  const newUser = {
    id: users.length, // will request from database
    name,
    mail,
    password,
    status: null,
    createdDate: `${date}, ${time}`,
    lastVisit: null,
  };
  
  users.push(newUser);
  res.status = 200;
  res.json({ currentUser: newUser });
});

app.put("/api/users/block", (req, res) => {
  console.log("block all");
  users.map(user => user.status = "Blocked");
  res.json({});
});

app.put("/api/users/block/:id", (req, res) => {
  console.log("block one");
  users.map((user, i) => {
    if (i === +req.params.id)
      user.status = "Blocked";
    return user;
  });
  res.json({});
});

app.put("/api/users/unblock/:id", (req, res) => {
  console.log("unblock one");
  users.map((user, i) => {
    if (i === +req.params.id)
      user.status = null;
    return user;
  });
  res.json({});
});

app.delete("/api/users/delete", (req, res) => {
  console.log("delete all");
  users = [];
  res.json({});
});

app.delete("/api/users/delete/:id", (req, res) => {
  console.log("delete", +req.params.id);
  users = users.filter(user => user.id !== +req.params.id);
  res.json({});
});

app.listen(port, () => console.log(`React-users app listening on http://localhost:${port}`));