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
const render_comentario_form = (req, res, next) => {
  res.render('comentarios', { title: 'Comentarios recibidos' });
}


const crear_comentario = (req, res) => {
  console.log(req.body)
  const path = '/api/comentarios/';
  const postdata = {
    correo: req.body.correo,
    comentario: req.body.comentario,
  };
  const url = `${apiOptions.server}${path}`;

  axios.post(url, postdata)
    .then(response => {
      if (response.status === 201) {
        res.render('index', { title: 'Mi Primera página Heroku' });
        console.log('Comentario creado exitosamente', response.data);
      }
    })
    .catch(error => {
      console.log('status code: ', error.response.status);
      console.log('error: ', error.message);
      res.render('error', { mensaje: 'Existe un error en la colección de comentarios' })
    });
}

module.exports = {
  render_comentario_form,
  crear_comentario,

  // comentarios - GET

}