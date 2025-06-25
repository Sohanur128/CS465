// app_server/routes/travel.js
var express = require('express');
var router = express.Router();
var ctrlTravel = require('../controllers/travel');

router.get('/', ctrlTravel.travel); // Fixed this line

module.exports = router;

