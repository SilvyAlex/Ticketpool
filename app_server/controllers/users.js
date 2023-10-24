const request = require('request');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}

///// Listar usuarios de Usuarios/////
// listar users - GET
const users = (req, res, body)=> {
  const path = '/api/users/';
  const requestOptions = { // objeto cargado con las opciones para request
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {}
  };
  console.log(requestOptions);
  request(
      requestOptions, 
      (err, response, body)=>{
          if (err) {
              console.log('Error al listar usuers: ', err);
          } else if (response.statusCode === 200) {
              renderUsers(req, res, body);
              console.log('Objeto resultante: ', body);
          } else {
              console.log('Status: ', response.statusCode);
              res.render('error', {
                  mensaje: 'Existe un error en la colección de users'
              })
          }
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
const doUsersCreate = (req, res)=>{
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
  const requestOptions = { // objeto cargado con las opciones para request
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postdata
  };
  console.log(requestOptions);
  request(
      requestOptions, 
      (err, response, body)=>{
          if (response.statusCode === 201) { // creación exitosa
              res.render('usuario_creacion', {
                  title: 'Creación de Usuarios',
                  mensaje: 'Usuario Creado Exitosamente'
              })
          } else {
              console.log('status code: ', response.statusCode);
              console.log('error: ', err);
              res.render('error', {mensaje: 'Existe un error en la colección de usuarios'})
          }
      });
}



///// Eliminar Usuario/////
// 0. render vista usuario_elimiar
const renderUsersDelete = (req, res, responseBody)=> {
    res.render('usuario_eliminar', { 
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
        documento: responseBody._id
    });
}

// 1. buscar el documento y mostrarlo en el formulario
const deleteUsers = (req, res, body)=> {
    const path = `/api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    console.log(requestOptions);
    request(
        requestOptions, 
        (err, response, body)=>{
            if (err) {
                console.log('Error al buscar usuarios: ', err);
            } else if (response.statusCode === 200) {
                renderUsersDelete(req, res, body);
                console.log('Objeto resultante: ', body);
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección de usuarios'
                })
            }
        });
}

// 2. eliminar el documento
const doUsersDelete = (req, res)=>{
    const path = `/api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',
        json: {}
    };
    console.log('Request Options: ', requestOptions);

    request(
        requestOptions, 
        (err, response, body)=>{
            if (response.statusCode === 204) { // eliminación exitosa
                console.log('Objeto resultante: ', body);
                return res.redirect('/');
            } else {
                console.log('status code: ', response.statusCode);
                console.log('error: ', err);
                res.render('error', {mensaje: 'Existe un error en la colección de usuarios'})
            }
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