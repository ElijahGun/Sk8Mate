const express = require('express');
const router = express.Router()
const skatePark = require("../models/skatepark"); //mongoose skatepark model
const Review = require('../models/review'); //mongoose review model
const catchAsync = require("../utils/catchAsync"); //Async wrapper function to catch errors
const { validateReview } = require('../utils/joiSchemas');
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const {renderReviewPage, createReview, deleteReview} = require('../controllers/reviewControllers');

router.route('/:id/review')
.get( isLoggedIn, catchAsync(renderReviewPage)) //Serves Review Page
.post( isLoggedIn, validateReview, catchAsync(createReview)) //Creates New Review

//delete review
router.delete('/:id/review/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(deleteReview))

module.exports = router;