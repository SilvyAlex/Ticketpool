// controllers

// homepage - GET
const comentarios = (req, res, next)=> {
    res.render('comentarios', { title: 'Mi Comentarios página Express' });
  }

module.exports = {
  comentarios, // index - GET
}