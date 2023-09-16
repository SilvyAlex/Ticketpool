// controllers

// homepage - GET
const segunda = (req, res, next)=> {
    res.render('segunda', { title: 'Mi Segunda página Express' });
  }

module.exports = {
  segunda, // index - GET
  
}