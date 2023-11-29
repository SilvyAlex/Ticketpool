const confirmation = (req, res, next)=> {
    res.render('confirmation', { title: 'Página de confirmación' });
  }

module.exports = {
    confirmation, // confirmación - GET
  
}