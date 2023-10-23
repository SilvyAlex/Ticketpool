const express = require('express');
   const router = express.Router();
   const ctrlEventos = require('../controllers/eventos');

   /* Definir las rutas para las acciones sobre la colección users */
   router
       .route('/eventos')
       .post(ctrlEventos.eventoCreate)
       .get(ctrlEventos.eventoList);

   router
       .route('/eventos/:eventoid')
       .get(ctrlEventos.eventoRead)
       .put(ctrlEventos.eventoUpdate)
       .delete(ctrlEventos.eventoDelete);

   module.exports = router;