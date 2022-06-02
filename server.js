const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./user.routes");

const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api", userRoutes);

app.listen(port, () => console.log(`React-users app listening on http://localhost:${port}`));