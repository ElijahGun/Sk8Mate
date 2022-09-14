const express = require("express");
const appConfig = require("./config.js");
const skateparks = require("./seed/skateparks");
const skatePark = require("./models/skatepark"); //mongoose skatepark model
const mongoose = require("mongoose");

const app = express();

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
app.set("view engine", "ejs");

//===================ROUTES========================================

app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

app.get("/skateparks", async (req, res) => {
  const skateparks = await skatePark.find({});
  res.render("partials/boilerplate.ejs", { skateparks });
});

app.listen(appConfig.port, () => {
  console.log(`listening on port`);
});
