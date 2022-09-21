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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', ReviewSchema, 'parkReviews')