const express = require('express');
const router = express.Router();

// Require controller modules.
const ctrlUser = require('../controllers/users');

const users = (req, res, next) => {
  res.render('users', { title: 'Entrar | ticket show' });
};

/* GET home page. */
router.get('/', ctrlUser.users);

// Creación de Usuarios
router
    .route('/add')
    .get(ctrlUser.renderUsersCreate)       // mostrar formulario
    .post(ctrlUser.doUsersCreate);

router
    .route('/delete/:userid')
    .get(ctrlUser.deleteUsers)       // mostrar formulario
    .post(ctrlUser.doUsersDelete); 

module.exports = router;
