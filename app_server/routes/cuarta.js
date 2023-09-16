const express = require('express');
const router = express.Router();

// controllers
const ctrlCuarta = require('../controllers/Cuarta');


/* GET home page. */
router.get('/', ctrlCuarta.cuarta);


module.exports = router;
