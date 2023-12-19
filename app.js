const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./app_api/models/db');//incorporo mi modelo a la app

const indexRouter = require('./app_server/routes/index');
const segundaRouter = require('./app_server/routes/segunda');
const terceraRouter = require('./app_server/routes/tercera');
const cuartaRouter = require('./app_server/routes/cuarta');
const registroRouter = require('./app_server/routes/registro');
const usersRouter = require('./app_server/routes/users');
const eventosRouter = require('./app_server/routes/eventos');
const comentariosRouter = require('./app_server/routes/comentarios');
const confirmationRouter = require('./app_server/routes/confirmation');

//Api Routes
const apiRouter = require('./app_api/routes/index');  // rutas REST API
const apiboletosRouter = require('./app_api/routes/boletos');  // rutas REST API
const apipagosRouter = require('./app_api/routes/pagos');  // rutas REST API
const apiusersRouter = require('./app_api/routes/index_users');  // rutas REST API
const apicomentariosRouter = require('./app_api/routes/comentarios');  // rutas REST API
const { log } = require('console');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));
console.log("carpeta public" ,path.join(__dirname, 'public'))

//Definicion de cuando usar los routers
app.use('/', indexRouter);
app.use('/segunda', segundaRouter);
app.use('/tercera', terceraRouter);
app.use('/cuarta', cuartaRouter); 
app.use('/registro', registroRouter);
app.use('/users', usersRouter);
app.use('/eventos', eventosRouter);
app.use('/confirmation', confirmationRouter);

// antes, usando la vieja vista pug
// app.use('/comentarios', comentariosRouter);

// ahora, usando la nueva vista que contiene React
app.get('/comentarios', (req, res) => {
  res.render('comentariosReact');
});

//Pasar la info a confirmación
app.get('/confirmacion', (req, res) => {
  const subtotal = " " // obtén el subtotal aquí
  res.render('confirmacion', {subtotal});
});

//Api routess
app.use('/api', apiRouter);
app.use('/api', apiboletosRouter);
app.use('/api', apipagosRouter);
app.use('/api', apiusersRouter);
app.use('/api', apicomentariosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
