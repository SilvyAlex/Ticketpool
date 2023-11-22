const express = require('express');
const router = express.Router();

// controllers
const ctrlComentarios = require('../controllers/comentarios');


/* GET home page. */
router.get('/', ctrlComentarios.comentarios);


module.exports = router;
