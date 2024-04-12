const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  // Check if the request contains an authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401); // No authorization header present

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // No token found in the header

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token verification failed
    req.user = user;
    next(); // Token is valid, proceed to the next middleware
  });
};

module.exports = authenticateToken;
