const express = require("express");
require("dotenv").config();
const app = express();
const connectToDb = require('./config/database');
const User = require('./model/userModel');
const bcrypt = require('bcrypt');

//express directly cannot handle json data format so we use middleware for it express.json()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from auth system</h1>");
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!(firstname && lastname && email && password)) {
    res.status(401).json({
      message: "All fields are required",
    });
  }
  const existingUser = await  User.findOne({email});
  if(existingUser){
    res.status(401).json({
      message: "User already exist"
    });
  }
  const encryptPass = await bcrypt.hash(password,   10);
  
  const user = await User.create({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password: encryptPass
  })


});

module.exports = app;
