// controllers
const request = require('request');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
}


// homepage - GET
const render_registro_form = (req, res, next) => {
  res.render('registro', { title: 'Mi Registro Express' });
}


const crear_usuario = (req, res) => {    
  console.log(req.body)
  const path = '/api/users/';
  //Los nombres de estos campos deben coincidir exactamente con el atributo 'name' de su respectivo Input Field en el View (en este caso)  registro.pug
  const postdata = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    edad: req.body.edad,
    ciudad: req.body.ciudad,
    intereses: [req.body.intereses],
  };
  const requestOptions = { // objeto cargado con las opciones para request
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  console.log(requestOptions);

  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 201) { // creación exitosa
        res.render('index', { title: 'Mi Primera página Heroku' });
        console.log('Usuario creado exitosamente', body);
      } else {
        console.log('status code: ', response.statusCode);
        console.log('error: ', err);
        res.render('error', { mensaje: 'Existe un error en la colección de usuarios' })
      }
    });


}


module.exports = {
  render_registro_form,
  crear_usuario,

  // index - GET

}