var fs = require('fs');

module.exports.about = function (req, res) {
  var about = JSON.parse(fs.readFileSync('./data/about.json', 'utf8'));
  res.render('about', { title: 'about', about });
};
