const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails
} = require("../controllers/userController");

const { isLoggedIn } = require("../middlewares/user");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/password/reset/:token", passwordReset);
router.get("/userdashboard", isLoggedIn, getLoggedInUserDetails);
router.post("/password/update", isLoggedIn, changePassword);
router.post("/userdashboard/update", isLoggedIn, updateUserDetails);

module.exports = router;
