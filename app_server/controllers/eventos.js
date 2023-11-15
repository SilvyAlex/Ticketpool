const axios = require('axios');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}

///// Listar eventos de eventos/////
// listar eventos - GET
const eventos = (req, res) => {
    const path = '/api/eventos/';
    const url = `${apiOptions.server}${path}`;
  
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          renderEventos(req, res, response.data);
          console.log('Objeto resultante: ', response.data);
        }
    
      })
      .catch(error => {
        console.log('Error al listar eventos: ', error.message);
        console.log('Status: ', error.response.status);
        res.render('error', { mensaje: 'Existe un error en la colección de eventos' })
      });
  }

// 0.Render de la vista eventos
const renderEventos = (req, res, responseBody)=> {
  res.render('eventos', { title: 'Listado de eventos', eventos: responseBody });
}


///// Creación de evento/////
//0. Render de la vista eventos_creacion
const renderEventosCreate = (req, res)=>{
  res.render('eventos_creacion',{ 
      title: 'Creación de Eventos',
      mensaje: 'Bienvenido a Creación de Eventos'
  });
}

//1. crear documento de evento
const doEventosCreate = (req, res) => {
    const path = '/api/eventos/';
    const postdata = {
        nombre: req.body.nombre,
        fecha: req. body.fecha,
        ubicacion: req. body.ubicacion,
        descripcion: req. body.descripcion,
    };
    const url = `${apiOptions.server}${path}`;
  
    axios.post(url, postdata)
      .then(response => {
        if (response.status === 201) {
          res.render('eventos_creacion', {
            title: 'Creación de Eventos',
            mensaje: 'Evento Creado Exitosamente'
          });
          console.log('Evento creado exitosamente', response.data);
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de eventos' })
      });
  }



///// Eliminar eventos/////
// 0. render vista eventos_elimiar
const renderEventosDelete = (req, res, responseBody)=> {
    res.render('eventos_eliminar', { 
        title: 'Eliminación de Eventos', 
        nombre: req.body.nombre,
        fecha: req. body.fecha,
        ubicacion: req. body.ubicacion,
        descripcion: req. body.descripcion,
        //documento: responseBody._id
    });
}

// 1. buscar el documento y mostrarlo en el formulario
const deleteEventos = (req, res) => {
    const path = `/api/eventos/${req.params.eventoid}`;
    const url = `${apiOptions.server}${path}`;
  
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          renderEventosDelete(req, res, response.data);
          console.log('Objeto resultante: ', response.data);
        }
      })
      .catch(error => {
        console.log('Error al buscar eventos: ', error.message);
        console.log('Status: ', error.response.status);
        res.render('error', { mensaje: 'Existe un error en la colección de eventos' })
      });
  }

// 2. eliminar el documento
const doEventosDelete = (req, res) => {
    const path = `/api/eventos/${req.params.eventoid}`;
    const url = `${apiOptions.server}${path}`;
  
    axios.delete(url)
      .then(response => {
        if (response.status === 204) {
          console.log('Eventos eliminado exitosamente');
          return res.redirect('/');
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de eventos' })
      });
  }


module.exports = {
    eventos, //index = GET

    // creación de eventos
    renderEventosCreate,  // 1. render de la vista eventos_create
    doEventosCreate,      // 2. creación del documento
    // eliminar de eventos
    deleteEventos,    // 1. buscar el documento y mostrarlo en el formulario
    doEventosDelete,  // 2. eliminar el documento

};