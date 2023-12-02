// routes/productRoutes.js
const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { getUPHByMC,getUPHByBom,getUPHByPkg } = require('../controllers/uphController');
const { downloadUPHByMC, downloadUPHByBom, downloadUPHByPkg } = require('../controllers/uphController');


const routerMcUPH = express.Router();
const routerUPHByBom = express.Router();
const routerUPHByPkg = express.Router();

const routerMcUPHDownload = express.Router();
const routerUPHByBomDownload = express.Router();
const routerUPHByPkgDownload = express.Router();


routerMcUPH.get('/:lastDate?/:plant?/:byModel?', authenticateToken, getUPHByMC);
routerUPHByBom.get('/:lastDate?/:plant?/:mc?',authenticateToken, getUPHByBom);
routerUPHByPkg.get('/:lastDate?/:plant?/:mc?',authenticateToken, getUPHByPkg)


routerMcUPHDownload.get('/:lastDate?/:plant?/:byModel?', authenticateToken, downloadUPHByMC);
routerUPHByBomDownload.get('/:lastDate?/:plant?/:byModel?',authenticateToken, downloadUPHByBom);
routerUPHByPkgDownload.get('/:lastDate?/:plant?/:byModel?',authenticateToken, downloadUPHByPkg);


module.exports ={
    routerMcUPH,
    routerUPHByBom,
    routerUPHByPkg,
    routerMcUPHDownload,
    routerUPHByBomDownload,
    routerUPHByPkgDownload
};
