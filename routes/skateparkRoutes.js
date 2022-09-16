const express = require('express');
const router = express.Router()
const skatePark = require("../models/skatepark"); //mongoose skatepark model

//all skateparks page
router.get("/", async (req, res) => {
    const skateparks = await skatePark.find({});
    res.render("./skateparks.ejs", { skateparks });
  });
  
  //new skatepark page
  router.get('/new', (req, res) => {
      res.render('./new.ejs');
  })
  
  //POST / add new skatepark
  router.post('/new', async (req, res, next) => {
      const { name, location, price, imgUrl } = req.body;
      const sk8park = new skatePark({name,location,price,imgUrl});
      await sk8park.save()
      console.log('success')
      res.redirect('/skateparks');
  })
  
  //GET skatepark edit page
  router.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const skatepark = await skatePark.findById(id);
    res.render('edit.ejs', { skatepark })
  })
  
  //PATCH changes
  router.patch('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { name, location, price, imgUrl, } = req.body;
    await skatePark.findByIdAndUpdate( id, {name, location, imgUrl, price})
    res.redirect(`/skateparks/${id}`)
  })
  
  //skatepark detail page
  router.get('/:id', async (req, res) => {
      const { id } = req.params;
      const skatepark = await skatePark.findById(id);
      res.render('detail.ejs', { skatepark });
  })
  
  //skatepark delete route
  router.delete('/:id', async (req, res) => {
      const { id } = req.params;
      await skatePark.findByIdAndDelete(id);
      console.log('WARNING -DELETED!')
      res.redirect('/skateparks')
  })
  
  module.exports = router;