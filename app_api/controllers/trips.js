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

module.exports = {
  tripsList,
  tripsFindByCode
};
