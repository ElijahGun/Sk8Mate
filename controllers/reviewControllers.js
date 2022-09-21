const skatePark = require('../models/skatepark');
const Review = require('../models/review');

module.exports.renderReviewPage = async(req, res, next) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id);
    res.render('newReview.ejs', { skatepark })
}

module.exports.createReview = async(req,res,next) => {
    const { id } = req.params;
    const { rating, review } = req.body;
    const skatepark = await skatePark.findById(id);
    const newReview = new Review({rating, review});
    newReview.author = req.user._id;
    skatepark.reviews.push(newReview);
    skatepark.save();
    newReview.save();
    req.flash('success', 'Successfuly Posted Review')
    res.redirect(`/skateparks/${id}`);
}

module.exports.deleteReview =  async (req, res) => {
    const { id, reviewId } = req.params;
    await skatePark.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfuly Deleted Review')
    res.redirect(`/skateparks/${id}`);
}