const express = require("express");
const appConfig = require("./config.js");
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require('method-override'); // allows for overide of default form method
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');

const app = express();

//import route files
const skateparkRoute = require('./routes/skateparkRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const user = require("./models/user");
const { serializeUser } = require("passport");

app.set("view engine", "ejs");
//=================Connect Mongoose / MongoDB ======================
// make mongo connection
mongoose.connect("mongodb://localhost:27017/Sk8Mate");

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongo Connection Error:"));

db.once("open", function () {
  console.log("Mongo Connection Successful!");
});

//================== MIDDLE WARE ==================================

app.use(express.static(path.join(__dirname, 'public'))) // make sure public folder accessible even if accessed outside
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')) // overide default form submission ex: post request to delete
const sessionConfig = {
  secret: 'notarealsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})
//===================ROUTES========================================

// Index / home page
app.get("/", (req, res) => {
  res.render('./index.ejs');
});

app.use('/skateparks', skateparkRoute); //skatepark routes
app.use('/skateparks', reviewRoute); //review routes

app.get('/fakeuser', async (req, res) => {
  const user = new User({email: 'someone@gmail.com', username: 'billyBob'});
  const newUser = await User.register(user, 'what?')
  res.send(newUser);
})

app.all('*', (req, res, next) => {
  throw new ExpressError('Page not found', 404)
})

app.use((err, req, res, next) => {
  console.log(err)
  const { message = 'Something went wrong', statusCode = 500 } = err;
  res.status(statusCode)
  res.render('./error.ejs');
})

app.listen(appConfig.port, () => {
  console.log(`listening on port`);
});
