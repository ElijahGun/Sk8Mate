const mongoose = require("mongoose");
const skateParkModel = require("../models/skatepark");

const skateParks = [
  {
    name: "sk8t Land",
    location: "Anaheim, CA",
    price: 0,
    imgUrl:
      "https://skatethestates.com/wp-content/uploads/2022/02/SK8-Charleston-Skatepark-in-South-Carolina.jpg",
  },
  {
    name: "Warp Tunnel",
    location: "Miami, FL",
    price: 0,
    imgUrl: "https://p300-americantownscom.netdna-ssl.com/img/article/sc-skate-parks-1.jpg",
  },
  {
    name: "Crazy Horse",
    location: "Chicago, IL",
    price: 0,
    imgUrl:
      "https://images.squarespace-cdn.com/content/v1/5925b3a4725e25314bce8d8a/1534389328329-9V140PTVV4WRLJK7GML3/0727181042c_HDR+2.jpg",
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