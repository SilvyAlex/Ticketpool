const axios = require('axios');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}

///// Listar usuarios de Usuarios/////
// listar users - GET
const users = (req, res) => {
    const path = '/api/users/';
    const url = `${apiOptions.server}${path}`;
  
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          renderUsers(req, res, response.data);
          console.log('Objeto resultante: ', response.data);
        }
    
      })
      .catch(error => {
        console.log('Error al listar usuarios: ', error.message);
        console.log('Status: ', error.response.status);
        res.render('error', { mensaje: 'Existe un error en la colección de usuarios' })
      });
  }

// 0.Render de la vista users
const renderUsers = (req, res, responseBody)=> {
  res.render('users', { title: 'Listado de Users', users: responseBody });
}


///// Creación de Usuarios/////
//0. Render de la vista usuarios_creacion
const renderUsersCreate = (req, res)=>{
  res.render('usuario_creacion',{ 
      title: 'Creación de Usuarios',
      mensaje: 'Bienvenido a Creación de Usuarios'
  });
}

//1. crear documento de usuario
const doUsersCreate = (req, res) => {
    const path = '/api/users/';
    const postdata = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      edad: req.body.edad,
      ciudad: req.body.ciudad,
      intereses: {
        Cine: req.body.Cine,
        Arte: req.body.Arte,
        Lectura: req.body.Lectura,
      },
    };
    const url = `${apiOptions.server}${path}`;
  
    axios.post(url, postdata)
      .then(response => {
        if (response.status === 201) {
          res.render('usuario_creacion', {
            title: 'Creación de Usuarios',
            mensaje: 'Usuario Creado Exitosamente'
          });
          console.log('Usuario creado exitosamente', response.data);
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de usuarios' })
      });
  }



///// Eliminar Usuario/////
// 0. render vista usuario_elimiar
const renderUsersDelete = (req, res, responseBody)=> {
    res.render('users_delete', { 
        title: 'Eliminación de Usuarios', 
        nombre: req.body.nombre,
        correo: req.body.correo,
        edad: req.body.edad,
        ciudad: req.body.ciudad,
        intereses: {
            Cine: req.body.Cine,
            Arte: req.body.Arte,
            Lectura: req.body.Lectura,
        },
        //documento: responseBody._id
    });
}

// 1. buscar el documento y mostrarlo en el formulario
const deleteUsers = (req, res) => {
    const path = `/api/users/${req.params.userid}`;
    const url = `${apiOptions.server}${path}`;
  
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          renderUsersDelete(req, res, response.data);
          console.log('Objeto resultante: ', response.data);
        }
      })
      .catch(error => {
        console.log('Error al buscar usuarios: ', error.message);
        console.log('Status: ', error.response.status);
        res.render('error', { mensaje: 'Existe un error en la colección de usuarios' })
      });
  }

// 2. eliminar el documento
const doUsersDelete = (req, res) => {
    const path = `/api/users/${req.params.userid}`;
    const url = `${apiOptions.server}${path}`;
  
    axios.delete(url)
      .then(response => {
        if (response.status === 204) {
          console.log('Usuario eliminado exitosamente');
          return res.redirect('/');
        }
      })
      .catch(error => {
        console.log('status code: ', error.response.status);
        console.log('error: ', error.message);
        res.render('error', { mensaje: 'Existe un error en la colección de usuarios' })
      });
  }


module.exports = {
    users, //index = GET

    // creación de usuarios
    renderUsersCreate,  // 1. render de la vista users_create
    doUsersCreate,      // 2. creación del documento
    // eliminar de usuarios
    deleteUsers,    // 1. buscar el documento y mostrarlo en el formulario
    doUsersDelete,  // 2. eliminar el documento

};