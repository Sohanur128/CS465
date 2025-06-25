var express = require('express');
var router = express.Router();
var ctrlMeals = require('../controllers/meals');

router.get('/', ctrlMeals.meals); // Fixed this line

module.exports = router;