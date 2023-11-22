const mongoose = require('mongoose');

const boletosSchema = new mongoose.Schema({
    imagen: {
        type: Buffer,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    introduccion: {
        type: String,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
    },
    genero: {
        type: String,
        require: true
    },
    redes: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    fotos: {
        type: Buffer,
        require: true
    }
});

// Registra el esquema con Mongoose
mongoose.model('boleto', boletosSchema);

// Ahora puedes usar el modelo boleto en tu aplicación
//const boleto = new Boleto({
    //evento: 'Rosalia',
    //hora: '20:00',
    //lugar: 'Quito',
//});

// user.save();
