const express = require('express');
const router = express.Router();

// Require controller modules.
const ctrlEvento = require('../controllers/eventos');

const eventos = (req, res, next) => {
  res.render('eventos', { title: 'Entrar | ticket show' });
};

/* GET home page. */
router.get('/', ctrlEvento.eventos);

// Creación de Eventos
router
    .route('/add')
    .get(ctrlEvento.renderEventosCreate)       // mostrar formulario
    .post(ctrlEvento.doEventosCreate);

router
    .route('/delete/:eventoid')
    .get(ctrlEvento.deleteEventos)       // mostrar formulario
    .post(ctrlEvento.doEventosDelete); 

module.exports = router;
