const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/dw3_202310_users'; //nombre-db es el nombre de la base de datos. Utilizaré la base de datos por defecto de MongoDB
const readLine = require('readline'); //para leer la línea de comandos

require('./esquema_users'); //llamada al esquema de usuarios

// Para escuchar evento de windows SINGINT
if (process.platform === 'win32') {
   const rl = readLine.createInterface({
      input: process.stdin, //entrada estándar
      output: process.stdout //salida estándar
   });
   rl.on('SIGINT', () => {
      process.emit("SIGINT"); //emite el evento SIGINT
   });
}

// Señales de terminación de procesos
// Para escuchar evento SIGINT en Windows
// Para escuchar evento SIGUSR2 en nodemon
// Para escuchar evento SIGTERM en Heroku

//evento node de node
process.once('SIGUSR2', () => { //escucha el evento SIGUSR2
   procShutdown('nodemon reiniciado', () => { //llamada a la función procShutdown
      process.kill(process.id, 'SIGUSR2'); //emite el evento SIGUSR2
   });
});

//evento windows
process.on('SIGINT', () => { //escucha el evento SIGUSR2
   procShutdown('ended by windows', () => { //llamada a la función procShutdown
      process.exit(0); //emite el evento SIGUSR2
   });
});

//evento heroku
process.on('SIGTERM', () => { //escucha el evento SIGUSR2
   procShutdown('ended by heroku', () => { //llamada a la función procShutdown
      process.exit(0); //emite el evento SIGUSR2
   });
});



// Para desconectar la aplicación de la base de datos Mongoose
const procShutdown = (msg, callback) => { //función que recibe un mensaje y una función callback
   mongoose.connection.close(); //cierra la conexión
      console.log(`Mongoose desconectado por ${msg}`); //mensaje de desconexión
      callback(); //llamada a la función callback
   };


//conexion a mongodb - dw3_202310_users es el nombre de la base de datos

mongoose.connect(dbURI,  { // método de conexión
   family: 4, // el controlador MongoDB probará IPv6 primero y si IPv6 falla trata IPv4                     
   serverSelectionTimeoutMS: 5000 // tiempo de espera para la selección del servidor en segundos
}).catch(err => console.log('Se presentó un error en MONGODB: ', err.reason));


// Eventos de conexión de Mongoose

mongoose.connection.on('connected', () => {
    console.log(`Mongoose se conectó a ${dbURI}`);//conexion exitosa
});
mongoose.connection.on('error', err => {
   console.log('Mongoose error de conexión:', err);//conexion fallida
});
mongoose.connection.on('disconnected', () => {
   console.log('Mongoose desconectado'); //desconexion exitosa
});


//conexion a mongodb - dw3_202310_users_log es el nombre de la base de datos

const dbURI_log = 'mongodb://localhost/dw3_202310_users_log'; //nombre-db es el nombre de la base de datos. Utilizaré la base de datos por defecto de MongoDB
const logDB = mongoose.createConnection(dbURI_log, { // método de conexión
   family: 4, // el controlador MongoDB probará IPv6 primero y si IPv6 falla trata IPv4                     
   serverSelectionTimeoutMS: 5000 // tiempo de espera para la selección del servidor en segundos
})

// Eventos de conexión de Mongoose_log

const logDBConnection = logDB;
logDBConnection.on('connected', () => {
  console.log(`Mongoose se conectó a ${dbURI_log}`);
});
logDBConnection.on('error', (err) => {
  console.error('Mongoose error de conexión secundaria:', err);
});
logDBConnection.on('disconnected', () => {
  console.log('Mongoose desconectado de la base de datos secundaria');
});