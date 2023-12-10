// controllers
const axios = require('axios');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}

const cuarta = (req, res, next)=> {
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
      res.render('cuarta', { title: 'Mi cuarta página Express', evento: evento });
    })
    .catch((error) => {
      console.log(error);

      // Manejar el error si es necesario
      // También puedes enviar un mensaje de error al renderizar la página si lo prefieres
      res.render('cuarta', { title: 'Mi cuarta página Express', evento: null, error: 'No se pudo obtener la información del evento.' });
    });
  }

  const crear_pago = (req, res) => {
    console.log(req.body)
    const path = '/api/pagos/';
    const postdata = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      pais: req.body.pais,
      ciudad: req.body.ciudad,
      metodo: req.body.metodo,
      tarjeta: req.body.tarjeta,
      numero: req.body.numero,
      vence: req.body.vence,
      cvv: req.body.cvv,
    };
    const url = `${apiOptions.server}${path}`;
  
    axios.post(url, postdata)
      .then(response => {
        if (response.status === 201) {
          res.render('cuarta');
          console.log('Pago creado exitosamente', response.data);
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de pagos' })
      });
  }

module.exports = {
    cuarta, // index - GET
    crear_pago,
}