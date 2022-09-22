const mongoose = require("mongoose");
const skateParkModel = require("../models/skatepark");

const skateParks = [
  {
    author: "6328bf99dc5dd095212da69a",
    name: "sk8t Land",
    location: "Anaheim, CA",
    price: 0,
    images:[{
      url:  'https://res.cloudinary.com/do8zqbtcx/image/upload/v1663802030/Sk8Mate/or5rxib9jqbwwk9p6crw.jpg',
      filename: 'Sk8Mate/or5rxib9jqbwwk9p6crw'
    }]
  },
  {
    author: "6328bf99dc5dd095212da69a",
    name: "Warp Tunnel",
    location: "Miami, FL",
    price: 0,
    images:[{
      url:  'https://res.cloudinary.com/do8zqbtcx/image/upload/v1663802030/Sk8Mate/or5rxib9jqbwwk9p6crw.jpg',
      filename: 'Sk8Mate/or5rxib9jqbwwk9p6crw'
    }],
  },
  {
    author: "6328bf99dc5dd095212da69a",
    name: "Crazy Horse",
    location: "Chicago, IL",
    price: 0,
    images:[{
      url: 'https://res.cloudinary.com/do8zqbtcx/image/upload/v1663802030/Sk8Mate/nvhhj1tiacatzcyiggxg.jpg',
      filename: 'Sk8Mate/nvhhj1tiacatzcyiggxg',  
    }]
  },
];

// make mongo connection
mongoose.connect("mongodb://localhost:27017/Sk8Mate");

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongo Connection Error:"));

db.once("open", function () {
  console.log("Mongo Connection Successful!");

  // skateParkModel.collection.deleteMany({}); // TO DELETE DB!!!

  skateParkModel.collection.insertMany(skateParks, function (err, docs) {
    if (err) {
      console.log("Error.. Seed fail");
      console.log(err)
    } else {
      console.log("Seed Successful");
    }
  });
});

//db.close();