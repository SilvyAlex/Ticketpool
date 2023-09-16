const express = require('express');
const router = express.Router();

// Require controller modules.
const ctrlUsers = require('../controllers/users'); // Asegúrate de tener el controlador adecuado

const users = (req, res, next) => {
  res.render('users');
};

/* GET users page. */
router.get('/', ctrlUsers.users); // usersPage sería la función que renderiza la vista de usuarios

module.exports = router;