const express = require("express");
const router = express.Router();
const skatePark = require("../models/skatepark"); //mongoose skatepark model
const catchAsync = require("../utils/catchAsync"); //Async wrapper function to catch errors
const { validateSkatepark } = require("../utils/joiSchemas"); //Joi server input validation
const flash = require('connect-flash');
const { isLoggedIn } = require('../middleware');

//all skateparks page
router.get(
  "/",
  catchAsync(async (req, res) => {
    const skateparks = await skatePark.find({});
    res.render("./skateparks.ejs", { skateparks });
  })
);

//new skatepark page
router.get("/new", isLoggedIn , (req, res) => {
  res.render("./new.ejs");
});

//POST / add new skatepark
router.post(
  "/new",
  validateSkatepark,
  catchAsync(async (req, res, next) => {
    const { name, location, price, imgUrl } = req.body;
    const sk8park = new skatePark({ name, location, price, imgUrl });
    await sk8park.save();
    req.flash('success', 'Successfuly added new skatepark!')
    console.log("success");
    res.redirect("/skateparks");
  })
);

//GET skatepark edit page
router.get(
  "/:id/edit", isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id);
    res.render("edit.ejs", { skatepark });
  })
);

//PATCH changes
router.patch(
  "/:id/edit",
  validateSkatepark,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, location, price, imgUrl } = req.body;
    await skatePark.findByIdAndUpdate(id, { name, location, imgUrl, price });
    res.redirect(`/skateparks/${id}`);
  })
);

//skatepark detail page
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id).populate('reviews');
    if (skatepark) {
      res.render("detail.ejs", { skatepark });
    }
    req.flash('error', 'Cannot find that skatepark!');
    res.redirect('/skateparks');
  })
);

//skatepark delete route
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await skatePark.findByIdAndDelete(id);
    req.flash('success', 'Successfuly deleted skatepark')
    res.redirect("/skateparks");
  })
);

module.exports = router;
