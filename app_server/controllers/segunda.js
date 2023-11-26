// controllers
const axios = require('axios');
// homepage - GET
const segunda = (req, res, next)=> {
  console.log(req.query.id)
  console.log(req.query)
  //Podemos ver el id del evento seleccionado(esta en req.query)
  //Lamar a la api dandole el id para que devuelva la informacion asociada con el evento
  //Renderizar la pagina del evento
  //Mandar en el render la variable y adentro del pug leer la variable
    res.render('segunda', { title: 'Mi Segunda página Express' });
  }

module.exports = {
  segunda, // index - GET
  
}