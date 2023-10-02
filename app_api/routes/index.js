const express = require('express');
   const router = express.Router();
   const ctrlUsers = require('../controllers/eventos');

   /* Definir las rutas para las acciones sobre la colección users */
   router
       .route('/eventos')
       .post(ctrlUsers.eventoCreate)
       .get(ctrlUsers.eventoList);

   router
       .route('/users/:userid')
       .get(ctrlUsers.eventoRead)
       .put(ctrlUsers.eventoUpdate)
       .delete(ctrlUsers.eventoDelete);

   module.exports = router;