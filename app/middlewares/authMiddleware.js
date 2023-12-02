// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { ADMIN } = require('../utils/roles');
const User = require('../models/user');

// Middleware to verify the access token
const authenticateToken = (req, res, next) => {

  if(process.env.BYPASS_AUTH === 'True'){
    return next();
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if the user is authorized
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden' });
    }
  };
};

// Middleware to check if the user has admin role
const isAdmin = (req, res, next) => {
  if (req.user.role === ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden' });
  }
};

module.exports = {
  authenticateToken,
  authorizeRole,
  isAdmin,
};
