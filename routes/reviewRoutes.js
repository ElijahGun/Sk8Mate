const express = require('express');
const router = express.Router()
const skatePark = require("../models/skatepark"); //mongoose skatepark model
const Review = require('../models/review'); //mongoose review model
const catchAsync = require("../utils/catchAsync"); //Async wrapper function to catch errors
const { validateReview } = require('../utils/joiSchemas');
// Serves new review page
router.get('/:id/review', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id);
    res.render('newReview.ejs', { skatepark })
} ) );

// Adds new review to skatepark
router.post('/:id/review', validateReview, catchAsync(async(req,res,next) => {
    const { id } = req.params;
    const { rating, review } = req.body;
    const skatepark = await skatePark.findById(id);
    const newReview = new Review({rating, review});
    skatepark.reviews.push(newReview);
    skatepark.save();
    newReview.save();
    res.redirect(`/skateparks/${id}`);
}))

module.exports = router;