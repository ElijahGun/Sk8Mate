const skatepark = require("./models/skatepark");
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must login first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const sk8park = await skatepark.findById(id);
  if (!sk8park.author.equals(req.user._id)) {
    req.flash("error", "Sorry, you do not have permission!");
    return res.redirect(`/skateparks/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const newReview = await Review.findById(reviewId);
  if (!newReview.author.equals(req.user._id)) {
    req.flash("error", "Sorry, you do not have permission!");
    return res.redirect(`/skateparks/${id}`);
  }
  next();
};

