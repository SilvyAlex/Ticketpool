const express = require('express');
   const router = express.Router();
   const ctrlPagos = require('../controllers/pagos');

   /* Definir las rutas para las acciones sobre la colección users */
   router
       .route('/pagos')
       .post(ctrlPagos.pagoCreate)
       .get(ctrlPagos.pagoList);

   router
       .route('/pagos/:pagoid')
       .get(ctrlPagos.pagoRead)
       .put(ctrlPagos.pagoUpdate)
       .delete(ctrlPagos.pagoDelete);

   module.exports = router;