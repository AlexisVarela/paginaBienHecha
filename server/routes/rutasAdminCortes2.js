const express = require('express');
const router = express.Router();

const {getCortes20, addCorte20, updateCorte20, deleteCorte20 }= require('../controller/corteController');

const {esAdmin} = require('../middlewares/authMiddleware')

router.get('/', esAdmin, getCortes20);
router.post('/addCorte20', addCorte20);
router.post('/editCorte20/:id', updateCorte20);
router.post('/deleteCorte20/:id', deleteCorte20);

module.exports = router;