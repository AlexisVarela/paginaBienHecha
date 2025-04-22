const express = require('express');
const router = express.Router();

const {getCortesUser} = require('../controller/corteController');

const {haySesion} = require('../middlewares/authMiddleware');

// Cortes user
router.get('/cards',haySesion, getCortesUser);

// Exportar rutas cortes user
module.exports = router;