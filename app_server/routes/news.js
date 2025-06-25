var express = require('express');
var router = express.Router();
var ctrlNews = require('../controllers/news');

router.get('/', ctrlNews.news); // Fixed this line

module.exports = router;