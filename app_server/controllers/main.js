// controllers

// homepage - GET
const index = (req, res, next)=> {
    res.render('index', { title: 'Mi Primera página Heroku' });
  }

module.exports = {
  index, // index - GET
  
}