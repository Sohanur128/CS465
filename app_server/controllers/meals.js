var fs = require('fs');

module.exports.meals = function (req, res) {
  var meals = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));
  res.render('meals', { title: 'meals', meals });
};