const mongoose = require('mongoose');

const pagosSchema = new mongoose.Schema({
    usuario: {
        type: String,
        require: true
    },
    evento: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
    },
    metodo: {
        type: Array
    },
    estado: {
        type: String
    }
});

const Pago = new mongoose.model('pago', pagosSchema);

const pago = new Pago({
    usuario: 'Juan',
    evento: 'Perez',
    precio: 'Quito',
    metodo: 'Quito',
    estado: 'Quito',
});

// user.save();
