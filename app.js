const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/database");
const router = require('./router/routes');

const app = express();

//express directly cannot handle json data format so we use middleware for it express.json()
app.use(express.json());
app.use('/', router);

module.exports = app;
