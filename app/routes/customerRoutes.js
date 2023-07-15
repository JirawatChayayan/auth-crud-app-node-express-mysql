// routes/customerRoutes.js
const express = require('express');
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const { authenticateToken, authorizeRole, isAdmin } = require('../middlewares/authMiddleware');
const { CUSTOMER, ADMIN } = require('../utils/roles');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole(ADMIN), getAllCustomers);
router.post('/', createCustomer);
router.put('/:id', authenticateToken, authorizeRole(ADMIN), updateCustomer);
router.delete('/:id', authenticateToken, isAdmin, deleteCustomer);

module.exports = router;
