const mongoose = require('mongoose');

const eventosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        'default': Date.now
    },
    ubicacion: {
        type: String,
        require: true
    },
    descripcion: {
        type: String
    }
});

const Evento = new mongoose.model('evento', eventosSchema);

const evento = new Evento({
    nombre: 'Juan',
    ubicacion: 'Perez',
    descripcion: 'Quito',
});

// user.save();
