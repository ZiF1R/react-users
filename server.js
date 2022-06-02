const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./user.routes");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api", userRoutes);

app.listen(port, () => console.log(`React-users app is running on ${port}`));