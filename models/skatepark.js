const mongoose = require('mongoose');
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
})

module.exports = mongoose.model('SkatePark', SkateParkSchema, 'skateparks');