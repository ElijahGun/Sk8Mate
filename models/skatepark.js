const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkateParkSchema = new Schema({
    name: String,
    Location: String,
    Price: Number
})

module.exports = mongoose.model('SkatePark', SkateParkSchema, 'skateparks');