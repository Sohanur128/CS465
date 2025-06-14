const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

Trip.deleteMany({})
  .then(() => {
    return Trip.insertMany(data);
  })
  .then(() => {
    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding error:', err);
  });
