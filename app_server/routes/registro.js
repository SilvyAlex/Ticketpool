const express = require('express');
const router = express.Router();

// controllers
const ctrlRegistro = require('../controllers/registro');


/* GET home page. 
router.get('/', ctrlRegistro.registro);*/

router
    .route('/')    // opcion para ser aun mas especificos
    .get(ctrlRegistro.render_registro_form)      // mostrar formulario
    .post(ctrlRegistro.crear_usuario);         // crear usuario



module.exports = router;
