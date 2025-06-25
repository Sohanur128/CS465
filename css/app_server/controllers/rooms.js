var fs = require('fs');

module.exports.rooms = function (req, res) {
  var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));
  res.render('rooms', { title: 'rooms', rooms });
};