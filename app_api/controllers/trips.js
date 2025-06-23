const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: /api/trips – List all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error retrieving trips:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET: /api/trips/:tripCode – Find a single trip by code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip with code ${req.params.tripCode} not found` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error(`Error finding trip ${req.params.tripCode}:`, err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST: /trips – Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  const q = await newTrip.save();

  if (!q) {
    // Database returned no data
    return res
      .status(400)
      .json({ error: 'Trip could not be saved' });
  } else {
    // Return new trip
    return res
      .status(201)
      .json(q);
  }


};



module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip
};
