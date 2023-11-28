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
        res.redirect(`/segunda?id=${response.data._id}`); //esta extrapolacion es equivalente a concatenar "/segunda?id=" + evento._id
        //res.redirect("/"); //una solucion viable que te lleva a Home
        //res.render('index', { title: 'Mi Primera página Heroku', eventos: [] }); //una opcion es hace un Redirect de /segunda con el ID del evento nuevo creado
        console.log('Evento creado exitosamente', response.data);
      }
    })
    .catch(error => {
      console.log('error: ', error);  //mejor que sea lo mas raw posible para entender cual es el error
      if(error && error.status)
      {
        res.render('error', { mensaje: 'Existe un error en la colección de eventos' })
      } else
      {
        res.redirect("/"); // asi evitamos que se cuelgue la app
      }
    });
}

module.exports = {
  render_eventos_form,
  crear_evento,

  // index - GET

}