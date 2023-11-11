// controllers
const axios = require('axios');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}


// homepage - GET
const render_registro_form = (req, res, next) => {
  res.render('registro', { title: 'Mi Registro Express' });
}


const crear_usuario = (req, res) => {
  console.log(req.body)
  const path = '/api/users/';
  const postdata = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    edad: req.body.edad,
    ciudad: req.body.ciudad,
    intereses: [req.body.intereses],
  };
  const url = `${apiOptions.server}${path}`;

  axios.post(url, postdata)
    .then(response => {
      if (response.status === 201) {
        res.render('index', { title: 'Mi Primera página Heroku' });
        console.log('Usuario creado exitosamente', response.data);
      }
    })
    .catch(error => {
      console.log('status code: ', error.response.status);
      console.log('error: ', error.message);
      res.render('error', { mensaje: 'Existe un error en la colección de usuarios' })
    });
}

module.exports = {
  render_registro_form,
  crear_usuario,

  // index - GET

}