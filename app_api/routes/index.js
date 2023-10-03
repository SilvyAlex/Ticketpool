const express = require('express');
   const router = express.Router();
   const ctrlEventos = require('../controllers/eventos');

   /* Definir las rutas para las acciones sobre la colección users */
   router
       .route('/eventos')
       .post(ctrlEventos.eventoCreate)
       .get(ctrlEventos.eventoList);

   //router
       //.route('/users/:userid')
       //.get(ctrlUsers.eventoRead)
       //.put(ctrlUsers.eventoUpdate)
       //.delete(ctrlUsers.eventoDelete);

   module.exports = router;