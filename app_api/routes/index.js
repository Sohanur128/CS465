const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens page 197
// const { authenticateJWT } = require('../config/auth'); //added in response to debugging missing "app_api/config/auth.js"
const authController = require("../controllers/authentication"); //suggested 


const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
// const authController = require("../controllers/authentication");


// Method to authenticate our JWT : Page 193
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  // console.log('Auth Header: ' + authHeader);

  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');
  if (headers.length < 2) {
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.sendStatus(501);
  }

  const token = headers[1]; // Bearer <token>
  if (token == null) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log('Token Validation Error!');
      return res.status(401).json({ message: 'Token Validation Error!' });
    }
    req.auth = verified; // Attach verified token to request
    next(); // Continue to the protected route
  });
}


router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip); // Protected POST

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip); // Protected PUT

  // define route for login endpoint : Module 7
router 
.route('/login') 
.post(authController.login);

module.exports = router;
