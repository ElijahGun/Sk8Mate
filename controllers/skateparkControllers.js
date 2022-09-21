const skatePark = require('../models/skatepark');

module.exports.renderSkateParks = async (req, res) => {
    const skateparks = await skatePark.find({});
    res.render("./skateparks.ejs", { skateparks });
  }

module.exports.renderNewParkPage = (req, res) => {
    res.render("./new.ejs");
  }

module.exports.createNewPark = async (req, res) => {
    const { name, location, price, imgUrl } = req.body;
    const sk8park = new skatePark({ name, location, price, imgUrl });
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
    const { name, location, price, imgUrl } = req.body;
    await skatePark.findByIdAndUpdate(id, { name, location, imgUrl, price });
    res.redirect(`/skateparks/${id}`);
  }

  module.exports.renderSkateParkDetail = async (req, res) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id).populate({path: 'reviews', populate:{path: 'author'}}).populate('author');
    if (skatepark) {
      res.render("detail.ejs", { skatepark });
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