// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Register a new user
const registerUser = (req, res) => {
  const { email, password, role } = req.body;

  // Check if the user already exists
  User.findByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error finding user' });
    }
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // Create a new user
      const newUser = {
        email,
        password: hash,
        role: role ? role : 'customer', // default role is customer
      };
      User.createUser(newUser, (err, userId) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }
        const accessToken = generateAccessToken(userId, newUser.role);
        return res.status(201).json({ accessToken });
      });
    });
  });
};

// Login user and generate access token
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error finding user' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }
      if (!result) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const accessToken = generateAccessToken(user.id, user.role);
      return res.json({ accessToken });
    });
  });
};

// Generate access token
const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
};

// Get user profile
const getProfile = (req, res) => {
  const { id } = req.user;
  User.findById(id, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error finding user' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
