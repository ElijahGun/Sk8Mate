const express = require("express");
const appConfig = require("./config.js");
const skatePark = require("./models/skatepark"); //mongoose skatepark model
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require('method-override'); // allows for overide of default form method

const app = express();

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
//===================ROUTES========================================

// Index page
app.get("/", (req, res) => {
  res.render('./index.ejs');
});

//all skateparks page
app.get("/skateparks", async (req, res) => {
  const skateparks = await skatePark.find({});
  res.render("./skateparks.ejs", { skateparks });
});

//new skatepark page
app.get('/skateparks/new', (req, res) => {
    res.render('./new.ejs');
})

//POST / add new skatepark
app.post('/skateparks/new', async (req, res, next) => {
    const { name, location, price, imgUrl } = req.body;
    const sk8park = new skatePark({name,location,price,imgUrl});
    await sk8park.save()
    console.log('success')
    res.redirect('/skateparks');
})

//skatepark edit page
//////TOODO: MAKE EDIT ROUTE FOR SKATEPARK

//skatepark detail page
app.get('/skateparks/:id', async (req, res) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id);
    res.render('detail.ejs', { skatepark });
})

//skatepark delete route
app.delete('/skateparks/:id', async (req, res) => {
    const { id } = req.params;
    await skatePark.findByIdAndDelete(id);
    console.log('WARNING -DELETED!')
    res.redirect('/skateparks')
})

app.listen(appConfig.port, () => {
  console.log(`listening on port`);
});
