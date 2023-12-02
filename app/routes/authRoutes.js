// routes/authRoutes.js
const express = require('express');
const {loginUser, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
