const express = require('express');
const router = express.Router();

// controllers
const ctrlRegistro = require('../controllers/registro');


/* GET home page. */
router.get('/', ctrlRegistro.registro);


module.exports = router;
