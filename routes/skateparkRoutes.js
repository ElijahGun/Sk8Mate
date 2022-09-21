const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync"); //Async wrapper function to catch errors
const { validateSkatepark } = require("../utils/joiSchemas"); //Joi server input validation
const flash = require("connect-flash");
const { isLoggedIn, isAuthor } = require("../middleware");
const {
  renderSkateParks,
  renderNewParkPage,
  createNewPark,
  renderEditPage,
  patchSkatePark,
  renderSkateParkDetail,
  deletePark,
} = require("../controllers/skateparkControllers");

//all skateparks page
router.get("/", catchAsync(renderSkateParks));

//new skatepark page
router
  .route("/new")
  .get(isLoggedIn, renderNewParkPage)
  .post(isLoggedIn, validateSkatepark, catchAsync(createNewPark));

//GET skatepark edit page
router
  .route("/:id/edit")
  .get(isLoggedIn, isAuthor, catchAsync(renderEditPage))
  .patch(validateSkatepark, isLoggedIn, isAuthor, catchAsync(patchSkatePark));

//skatepark detail page
router
  .route("/:id")
  .get(catchAsync(renderSkateParkDetail))
  .delete(isLoggedIn, isAuthor, catchAsync(deletePark));

module.exports = router;
