const axios = require('axios');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
} 

const confirmation = (req, res, next)=> {
  const eventId = req.query.id;
  console.log(eventId);

  // Llamar a la API dándole el ID para que devuelva la información asociada con el evento
  const path = `/api/eventos/${eventId}`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${apiOptions.server}${path}`,
    headers: {}
  };

  axios.request(config)
    .then((response) => {
      const evento = response.data;
      console.log(JSON.stringify(evento));

      // Renderizar la página del evento y pasar la información del evento al render
      res.render('confirmation', { title: 'Confirmación del evento', evento: evento });
    })
    .catch((error) => {
      console.log(error);

      // Manejar el error si es necesario
      // También puedes enviar un mensaje de error al renderizar la página si lo prefieres
      res.render('confirmation', { title: 'Confirmación del evento', evento: null, error: 'No se pudo obtener la información del evento.' });
    });
  }

module.exports = {
    confirmation, // confirmación - GET
  
}