const express = require('express');
const router = express.Router();

// controllers
const ctrlComentarios = require('../controllers/comentarios');


/* GET home page. 
router.get('/', ctrlComentarios.comentarios);*/

router
    .route('/')    // opcion para ser aun mas especificos
    .get(ctrlComentarios.render_comentario_form)      // mostrar formulario
    .post(ctrlComentarios.crear_comentario);         // crear usuario

module.exports = router;
