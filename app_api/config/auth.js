// I had this error "ReferenceError: authenticateJWT is not defined → in app_api/routes/index.js line 16"
// Our instruction document never defined or imported it
// Fix: Created this auth.js and imported authenticateJWT

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }
      req.user = user;
      next(); // Proceed to next middleware
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

module.exports = { authenticateJWT };
