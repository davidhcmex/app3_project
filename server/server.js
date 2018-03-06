const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

let users = require("./routes/users");




app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use("/api/users", users);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.listen(port, () => console.log(`Listening on port ${port}`));