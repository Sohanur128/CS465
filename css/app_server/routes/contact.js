var express = require('express');
var router = express.Router();
var ctrlContact = require('../controllers/contact');

router.get('/', ctrlContact.contact); // Fixed this line

module.exports = router;