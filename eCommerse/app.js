require('dotenv').config();
const express = require('express');
const app = express();

//import all the routes here 
const home = require('./routes/home');

//router middleware
app.use('/api/v1', home);

app.use(express.json());



module.exports = app;
