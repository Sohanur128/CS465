var fs = require('fs');

module.exports.news = function (req, res) {
  var news = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
  res.render('news', { title: 'news', news });
};
