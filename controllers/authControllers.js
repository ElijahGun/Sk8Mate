const User = require('../models/user');

module.exports.renderRegisterPage = (req, res) => {
    res.render("./auth/register.ejs");
  }

module.exports.registerUser = async (req, res) => {
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
  }

  module.exports.renderLoginPage = (req, res) => {
    res.render("./auth/login.ejs");
  }

  module.exports.returnUserToPage =  (req, res) => {
    const redirectUrl = req.session.returnTo || "/skateparks";
    delete req.session.returnTo;
    req.flash("success", "Welcome Back!");
    res.redirect(redirectUrl);
  }

  module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
      if (err) return next(err);
      req.flash("success", "Successfuly Logged Out");
      res.redirect("/skateparks");
    });
  }