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
const render_eventos_form = (req, res, next) => {
  res.render('eventos', { title: 'Mi Eventos Express' });
}


const crear_evento = (req, res) => {
  console.log(req.body)
  const path = '/api/eventos/';
  const postdata = {
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    introduccion: req.body.introduccion,
    fecha: req. body.fecha,
    ubicacion: req. body.ubicacion,
    genero: req.body.genero,
    redes: req.body.redes,
    descripcion: req. body.descripcion,
    fotos: req.body.fotos,
  };
  const url = `${apiOptions.server}${path}`;

  axios.post(url, postdata)
    .then(response => {
      if (response.status === 201) {
        res.render('index', { title: 'Mi Primera página Heroku' });
        console.log('Evento creado exitosamente', response.data);
      }
    })
    .catch(error => {
      console.log('status code: ', error.response.status);
      console.log('error: ', error.message);
      res.render('error', { mensaje: 'Existe un error en la colección de eventos' })
    });
}

module.exports = {
  render_eventos_form,
  crear_evento,

  // index - GET

}