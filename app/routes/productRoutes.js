// routes/productRoutes.js
const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authenticateToken, authorizeRole, isAdmin } = require('../middlewares/authMiddleware');
const { ADMIN } = require('../utils/roles');

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.post('/', authenticateToken, authorizeRole(ADMIN), createProduct);
router.put('/:id', authenticateToken, authorizeRole(ADMIN), updateProduct);
router.delete('/:id', authenticateToken, isAdmin, deleteProduct);

module.exports = router;
