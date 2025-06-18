var fs = require('fs');

module.exports.contact = function (req, res) {
  var contact = JSON.parse(fs.readFileSync('./data/contact.json', 'utf8'));
  res.render('contact', { title: 'contact', contact });
};
