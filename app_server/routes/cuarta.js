const express = require('express');
const router = express.Router();

// controllers
const ctrlCuarta = require('../controllers/cuarta');


/* GET home page.
router.get('/', ctrlCuarta.cuarta);*/
router
    .route('/')    // opcion para ser aun mas especificos
    .get(ctrlCuarta.cuarta)      // mostrar formulario
    .post(ctrlCuarta.crear_pago);         // crear usuario

module.exports = router;
