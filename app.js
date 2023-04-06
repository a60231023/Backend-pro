const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello from auth system</h1>");
});

module.exports = app;
