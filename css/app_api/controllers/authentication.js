const passport = require('passport'); // page 193 ref. 
console.log("authentication controller loaded"); //added suggested


const mongoose = require('mongoose');
const User = require('../models/user');

const register = async (req, res) => {
  // Validate message to insure that all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  const user = new User({
    name: req.body.name,           // Set User name
    email: req.body.email,         // Set e-mail address
    password: ''                   // Start with empty password
  });

  user.setPassword(req.body.password); // Set user password
  const q = await user.save();

  if (!q) {
    // Database returned no data
    return res
      .status(400)
      .json(err);
  } else {
    // Return new user token
    const token = user.generateJWT();
    return res
      .status(200)
      .json(token);
  }
};


// Added the missing login function: Defined the login function BEFORE exporting
// const login = (req, res) => {
//res.status(200).json({ message: "Login function is not yet implemented." });
//};

// Updated login fuction- Module 7 added
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res); // We need this part!
};


// updated the export line to include login = Exported both functions
// Export methods that drive endpoints.
module.exports = {
  register,
  login
};


// module.exports = {
// register
// }; 


 
