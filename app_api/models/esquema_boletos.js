const mongoose = require('mongoose');

const boletosSchema = new mongoose.Schema({
    evento: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        'default': Date.now
    },
    hora: {
        type: Number,
        require: true
    },
    lugar: {
        type: String,
    },
    asientos: {
        type: Number
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
