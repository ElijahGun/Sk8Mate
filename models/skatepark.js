const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkateParkSchema = new Schema({
    name: String,
    location: String,
    price: Number,
    imgUrl: String
})

module.exports = mongoose.model('SkatePark', SkateParkSchema, 'skateparks');