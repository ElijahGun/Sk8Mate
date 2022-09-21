const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const {
  renderRegisterPage,
  registerUser,
  renderLoginPage,
  returnUserToPage,
  logoutUser
} = require("../controllers/authControllers");

router.route('/register')
.get( renderRegisterPage)
.post( catchAsync(registerUser));

router.route('/login')
.get( renderLoginPage)
.post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
 returnUserToPage
);

router.get("/logout", logoutUser);

module.exports = router;
