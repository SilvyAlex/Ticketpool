const tercera = (req, res, next)=> {
    res.render('tercera', { title: 'Mi tercera página Express' });
  }

module.exports = {
    tercera, // index - GET
  
}