const express = require('express');
const router = express.Router()
const skatePark = require("../models/skatepark"); //mongoose skatepark model


router.get('/skateparks/:id/review')