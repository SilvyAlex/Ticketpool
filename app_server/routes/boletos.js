const express = require('express');
const router = express.Router();

// Require controller modules.
const ctrlBoleto = require('../controllers/boletos');

const boletos = (req, res, next) => {
  res.render('boletos', { title: 'Entrar | ticket show' });
};

/* GET home page. */
router.get('/', ctrlBoleto.boletos);

// Creación de Boletos
router
    .route('/add')
    .get(ctrlBoleto.renderBoletosCreate)       // mostrar formulario
    .post(ctrlBoleto.doBoletosCreate);

router
    .route('/delete/:boletoid')
    .get(ctrlBoleto.deleteBoletos)       // mostrar formulario
    .post(ctrlBoleto.doBoletosDelete); 

module.exports = router;
