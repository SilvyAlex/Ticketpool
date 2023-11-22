const express = require('express');
const router = express.Router();

// controllers
const ctrlEventos = require('../controllers/eventos');


/* GET home page. 
router.get('/', ctrlRegistro.registro);*/

router
    .route('/')    // opcion para ser aun mas especificos
    .get(ctrlEventos.render_eventos_form)      // mostrar formulario
    .post(ctrlEventos.crear_evento);         // crear usuario



module.exports = router;
