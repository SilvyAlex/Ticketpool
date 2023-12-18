const express = require('express');
const router = express.Router();
const ctrlComentarios = require('../controllers/comentarios');

// Definir las rutas para las acciones (CRUD) sobre comentarios
router
    .route('/comentarios')
    .post(ctrlComentarios.comentarioCreate)
    .get(ctrlComentarios.comentarioList);

router
    .route('/comentario/:comentarioid')
    .get(ctrlComentarios.comentarioRead)
    .put(ctrlComentarios.comentarioUpdate)
    .delete(ctrlComentarios.comentarioDelete);


module.exports = router;