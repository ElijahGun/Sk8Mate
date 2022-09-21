const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const SkateParkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

SkateParkSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
       await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('SkatePark', SkateParkSchema, 'skateparks');