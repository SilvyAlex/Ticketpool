// controllers
const axios = require('axios');
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}

// homepage - GET
const index = (req, res, next) => {
  // Obtener los eventos de la API
  const path = '/api/eventos/';
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${apiOptions.server}${path}`,
    headers: {}
  };

  axios.request(config)
    .then((response) => {
      // Procesar los eventos obtenidos
      const eventos_recibidos = response.data;

      // Enviar estos eventos a eventos.pug mediante la función render
      res.render('index', { title: 'Mi Primera página Heroku', eventos: eventos_recibidos });
    })
    .catch((error) => {
      console.log(error);
      // Manejar el error si es necesario
      // También puedes enviar un mensaje de error al renderizar la página si lo prefieres
      res.render('index', { title: 'Mi Primera página Heroku', eventos: [] });
    });
  };
  
module.exports = {
  index, // index - GET
  
}

