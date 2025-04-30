const express = require('express');
const router = express.Router();

const {getCortesHome} = require('../controller/cortesHome');

router.get('/', getCortesHome);

module.exports = router;