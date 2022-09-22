const skatePark = require('../models/skatepark');
const cloudinary = require("cloudinary").v2;
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.renderSkateParks = async (req, res) => {
    const skateparks = await skatePark.find({});
    res.render("./skateparks.ejs", { skateparks });
  }

module.exports.renderNewParkPage = (req, res) => {
    res.render("./new.ejs");
  }

module.exports.createNewPark = async (req, res) => {
    const { name, location, price, image  } = req.body;
    const sk8park = new skatePark({ name, location, price, image });
    sk8park.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    sk8park.author = req.user._id;
    await sk8park.save();
    req.flash('success', 'Successfuly added new skatepark!')
    console.log("success");
    res.redirect("/skateparks");
  }

  module.exports.renderEditPage = async (req, res) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id);
    res.render("edit.ejs", { skatepark });
  }

  module.exports.patchSkatePark = async (req, res) => {
    const { id } = req.params;
    console.log('req.body ======>', req.body);
    const { name, location, price } = req.body;
    const sk8park = await skatePark.findByIdAndUpdate(id, { name, location, price });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
    sk8park.images.push(...imgs)
    await sk8park.save();
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await sk8park.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
  }
    req.flash('success', 'Successfuly Updated Skatepark!')
    res.redirect(`/skateparks/${id}`);
  }

  module.exports.renderSkateParkDetail = async (req, res) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id).populate({path: 'reviews', populate:{path: 'author'}}).populate('author');
    if (skatepark) {
      return res.render("detail.ejs", { skatepark });
    }
    req.flash('error', 'Cannot find that skatepark!');
    res.redirect('/skateparks');
  }

  module.exports.deletePark = async (req, res) => {
    const { id } = req.params;
    await skatePark.findByIdAndDelete(id);
    req.flash('success', 'Successfuly deleted skatepark')
    res.redirect("/skateparks");
  }