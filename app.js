const express = require("express");
require("dotenv").config();
const app = express();
const connectToDb = require("./config/database");
const User = require("./model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//express directly cannot handle json data format so we use middleware for it express.json()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from auth system</h1>");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(firstname && lastname && email && password)) {
      res.status(401).json({
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({
        message: "User already exist",
      });
    }
    const encryptPass = await bcrypt.hash(password, 10);

    let user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: encryptPass,
      token: undefined,
    });

    //token creation - simple function jwt.sign which take in the payload i.e any unqiue value up to you- as an object, then the next thing will be secret key . now the unique thing will be the id which mongodb will give us when we have created the user.the last argument is the algorith and the expire. you need you mention the algorith only if you wnat to change it. default is sha256

    const jwttoken = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    User.findByIdAndUpdate(user._id, { token: jwttoken }, { new: true })
      .then((updatedUser) => {
        user = updatedUser;
        console.log("User updated:", updatedUser);
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        res.status(500).json({
          message: "server error while updating the token",
          error
        })
      });

    user.password = undefined;
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
