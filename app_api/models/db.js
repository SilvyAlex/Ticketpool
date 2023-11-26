const mongoose = require('mongoose');
const { platform } = require('os');
let dbURI = 'mongodb://127.0.0.1/ticketpool'; // string de conexión
if (process.env.MONGODBURI){ dbURI = process.env.MONGODBURI }

const readLine = require('readline');

require('./esquema_eventos'); // definición del esquema
require('./esquema_boletos');
require('./esquema_pagos');
require('./esquema_users');
//require('./esquema_users');

// escuchar el evento e windows SIGINT
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT'); // emitir evento
    });
}

// proceso para cerrar la conexión a MONGODB (mongoose)
const procShutdown = (msg, callback) => {
    mongoose.connection.close();
    console.log(`Mongoose se desconectó por: ${msg}`);
    callback();
};

// Señales de terminación de procesos:
// windows: SIGINT
// node: SIGUSR2
// heroku: SIGTERM

// evento node SIGUSR2 
process.once('SIGUSR2', () => {
    procShutdown('nodemon restart', () => {
        process.kill(process.id, 'SIGUSR2');
    });
});

// evento windows SIGINT
process.on('SIGINT', () => {
    procShutdown('ended by windows', () => {
        process.exit(0);
    });
});

// evento heroku SIGTERM
process.on('SIGTERM', () => {
    procShutdown('heroku app shutdown', () => {
        process.exit(0);
    });
});

// conexión a mongodb - dw3_202310_users
mongoose.connect(dbURI, {
    family: 4, // probará IPv6, si no funcioná usará IPv4
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log('Se presentó un error de conexion en MONGODB: ', err.reason));

// mensajes de los eventos de conexión
// conexión exitosa
mongoose.connection.on('connected', () => {
    console.log('Mongoose se conectó a: ', dbURI);
});

// conexión con error
mongoose.connection.on('err', () => {
    console.log('Mongoose error de conexión a: ', dbURI);
});

// desconexión 
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose se desconectó a: ', dbURI);
});

