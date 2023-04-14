const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
} = require("../controllers/userController");

const {isLoggedIn} = require('../middlewares/user');

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/password/reset/:token", passwordReset);
router.get("/userdashboard", isLoggedIn, getLoggedInUserDetails);

module.exports = router;
