const cuarta = (req, res, next)=> {
    res.render('cuarta', { title: 'Mi cuarta página Express' });
  }

module.exports = {
    cuarta, // index - GET

}