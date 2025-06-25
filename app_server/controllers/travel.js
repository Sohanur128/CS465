// app_server/controllers/travel.js


var fs = require('fs');

module.exports.travel = function (req, res) {
  var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
  res.render('travel', { title: 'Travel', trips });
};


