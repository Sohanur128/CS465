const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: trips - lists all trips
const tripsList = async (req, res) => {
  const q = await Model.find({}).exec();

  if (!q) {
    return res.status(404).json({ "message": "no trips found" });
  } else {
    return res.status(200).json(q);
  }
};

// GET: trips/:tripCode - single trip
const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }).exec();

  if (!q) {
    return res.status(404).json({ "message": "trip not found" });
  } else {
    return res.status(200).json(q[0]);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
