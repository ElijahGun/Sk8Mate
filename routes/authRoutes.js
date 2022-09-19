const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("./auth/register.ejs");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash("success", "Welcome to Sk8Mate!");
        res.redirect("/skateparks");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("./auth/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" , keepSessionInfo: true}),
  (req, res) => {
    const redirectUrl = req.session.returnTo || '/skateparks';
    delete req.session.returnTo;
    req.flash("success", "Welcome Back!");
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout(err => {
     if (err) return next(err) 
    req.flash("success", "Successfuly Logged Out");
     res.redirect("/skateparks");
   });
});

module.exports = router;
