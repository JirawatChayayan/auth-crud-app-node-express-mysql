// routes/productRoutes.js
const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { getMcInfo,getMcModel,getMclist,getMcIsFlow3Plant } = require('../controllers/machineInfoController');

const router = express.Router();

router.get('/', authenticateToken, getMcInfo);
router.get('/model', authenticateToken, getMcModel);
router.get('/mclist', authenticateToken, getMclist);
router.get('/3optflow', authenticateToken, getMcIsFlow3Plant);

module.exports = router;
