// controllers

// homepage - GET
const registro = (req, res, next)=> {
    res.render('registro', { title: 'Mi Registro Express' });
  }

module.exports = {
  registro, // index - GET
  
}