const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Review', ReviewSchema, 'parkReviews')