var fs = require('fs');

module.exports.index = function (req, res) {
  var index = JSON.parse(fs.readFileSync('./data/index.json', 'utf8'));
  res.render('index', { title: 'index', index });
};
