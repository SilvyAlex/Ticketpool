const axios = require('axios');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}

///// Listar usuarios de boletos/////
// listar boletos - GET
const boletos = (req, res) => {
    const path = '/api/boletos/';
    const url = `${apiOptions.server}${path}`;
  
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          renderBoletos(req, res, response.data);
          console.log('Objeto resultante: ', response.data);
        }
    
      })
      .catch(error => {
        console.log('Error al listar boletos: ', error.message);
        console.log('Status: ', error.response.status);
        res.render('error', { mensaje: 'Existe un error en la colección de boletos' })
      });
  }

// 0.Render de la vista boletos
const renderBoletos = (req, res, responseBody)=> {
  res.render('boletos', { title: 'Listado de Boletos', boletos: responseBody });
}


///// Creación de boletos/////
//0. Render de la vista boletos_creacion
const renderBoletosCreate = (req, res)=>{
  res.render('boletos_creacion',{ 
      title: 'Creación de Boletos',
      mensaje: 'Bienvenido a Creación de Boletos'
  });
}

//1. crear documento de boleto
const doBoletosCreate = (req, res) => {
    const path = '/api/boletos/';
    const postdata = {
        evento: req.body.evento,
        fecha: req.body.fecha,
        hora: req.body.hora,
        lugar: req.body.lugar,
        asientos: req.body.asientos,
    };
    const url = `${apiOptions.server}${path}`;
  
    axios.post(url, postdata)
      .then(response => {
        if (response.status === 201) {
          res.render('boletos_creacion', {
            title: 'Creación de Boletos',
            mensaje: 'Boletos Creado Exitosamente'
          });
          console.log('Boletos creado exitosamente', response.data);
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de boletos' })
      });
  }



///// Eliminar boletos/////
// 0. render vista boletos_elimiar
const renderBoletosDelete = (req, res, responseBody)=> {
    res.render('boletos_delete', { 
        title: 'Eliminación de Boletos', 
        evento: req.body.evento,
            fecha: req.body.fecha,
            hora: req.body.hora,
            lugar: req.body.lugar,
            asientos: req.body.asientos,
        //documento: responseBody._id
    });
}

// 1. buscar el documento y mostrarlo en el formulario
const deleteBoletos = (req, res) => {
    const path = `/api/boletos/${req.params.boletoid}`;
    const url = `${apiOptions.server}${path}`;
  
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          renderBoletosDelete(req, res, response.data);
          console.log('Objeto resultante: ', response.data);
        }
      })
      .catch(error => {
        console.log('Error al buscar boletos: ', error.message);
        console.log('Status: ', error.response.status);
        res.render('error', { mensaje: 'Existe un error en la colección de boletos' })
      });
  }

// 2. eliminar el documento
const doBoletosDelete = (req, res) => {
    const path = `/api/boletos/${req.params.boletoid}`;
    const url = `${apiOptions.server}${path}`;
  
    axios.delete(url)
      .then(response => {
        if (response.status === 204) {
          console.log('Boleto eliminado exitosamente');
          return res.redirect('/');
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de boletos' })
      });
  }


module.exports = {
    boletos, //index = GET

    // creación de boletos
    renderBoletosCreate,  // 1. render de la vista boletos_create
    doBoletosCreate,      // 2. creación del documento
    // eliminar de boletos
    deleteBoletos,    // 1. buscar el documento y mostrarlo en el formulario
    doBoletosDelete,  // 2. eliminar el documento

};