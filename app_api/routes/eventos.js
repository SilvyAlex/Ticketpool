const express = require('express');
const router = express.Router();
const ctrlEventos = require('../controllers/eventos');

// Definir las rutas para las acciones (CRUD) sobre users
router
    .route('/eventos')
    .post(ctrlEventos.eventoCreate)
    .get(ctrlEventos.eventoList);

router
    .route('/users/:userid')
    .get(ctrlEventos.eventoRead)
    .put(ctrlEventos.eventoUpdate)
    .delete(ctrlEventos.eventoDelete);

router
    .route('/search/:name')
    .get(ctrlEventos.eventoFindName);

module.exports = router;