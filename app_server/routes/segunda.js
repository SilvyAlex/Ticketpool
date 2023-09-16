const express = require('express');
const router = express.Router();

// controllers
const ctrlMain = require('../controllers/segunda');


/* GET home page. */
router.get('/', ctrlSegunda.segunda);


module.exports = router;
