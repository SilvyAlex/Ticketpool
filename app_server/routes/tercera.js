const express = require('express');
const router = express.Router();

// controllers
const ctrlTercera = require('../controllers/tercera');


/* GET home page. */
router.get('/', ctrlTercera.tercera);


module.exports = router;
