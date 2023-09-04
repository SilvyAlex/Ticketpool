const express = require('express');
const router = express.Router();

// Require controller modules.
const ctrlMain = require('../controllers/main');

const homepage = (req, res, next) => {
  res.render('index', { title: 'Mi primera pagina Express' });
};

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;