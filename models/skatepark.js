const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const opts = { toJSON: {virtuals: true}};

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


const SkateParkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    geometry: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
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
    images: [ImageSchema],
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
}, opts);

SkateParkSchema.virtual('properties.popupText').get(function () {
    return `<a href="/skateparks/${this._id}">${this.name}</a> <p>${this.description}.subs</p>`;
});

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