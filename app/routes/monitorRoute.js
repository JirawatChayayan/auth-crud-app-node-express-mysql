// routes/productRoutes.js
const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { getMonitoring } = require('../controllers/monitorController');



const router = express.Router();

router.get('/',authenticateToken,getMonitoring);

module.exports = router;
