const express = require('express');
const router = express.Router();

// controllers
const ctrlConfirmation = require('../controllers/confirmation');


/* GET home page. */
router.get('/', ctrlConfirmation.confirmation);


module.exports = router;
