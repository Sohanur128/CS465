var express = require('express');
var router = express.Router();
var ctrlAbout = require('../controllers/about');

router.get('/', ctrlAbout.about); // Fixed this line

module.exports = router;

