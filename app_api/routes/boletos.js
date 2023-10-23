const express = require('express');
const router = express.Router();
const ctrlBoletos = require('../controllers/boletos');

   /* Definir las rutas para las acciones sobre la colección users */
   router
       .route('/boletos')
       .post(ctrlBoletos.boletoCreate)
       .get(ctrlBoletos.boletoList);

   router
       .route('/boletos/:boletoid')
       .get(ctrlBoletos.boletoRead)
       .put(ctrlBoletos.boletoUpdate)
       .delete(ctrlBoletos.boletoDelete);

   module.exports = router;