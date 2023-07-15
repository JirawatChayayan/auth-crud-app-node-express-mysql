// routes/userRoutes.js
const express = require('express');
const { updateUserRole } = require('../models/user');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const User = require('../models/user');

const router = express.Router();

// Update user role
router.put('/:id/role', authenticateToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  User.updateUserRole(id, role, (error, success) => {
    if (error) {
      return res.status(500).json({ message: 'Error updating user role' });
    }
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
