const mongoose = require('mongoose');

const pagosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        // required: true
    },
    email: {
        type: String, 
        // required: true
    },
    pais: {
        type: String, 
        // required: true
    },
    ciudad: {
        type: String, 
        // required: true
    },
    metodo: {
        type: String, 
        // required: true
    },
    tarjeta: {
        type: String, 
        // required: true
    },
    numero: {
        type: String, 
        // required: true
    },
    vence: {
        type: String, 
        // required: true
    },
    cvv: {
        type: String
    },
    id_evento: {
        type: String,
        required: true
    }
});

const Pago = new mongoose.model('pago', pagosSchema);

const pago = new Pago({
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'jp@gmail.com',
    pais: 'Ecuador',
    ciudad: 'Quito',
    metodo: 'Debito',
    tarjeta: 'Juan Perez',
    numero: '123456789123',
    vence: '12/26',
    cvv: '123',
    id_evento: '1657760a4d1f86c61f2ca23c3 ',
});

// user.save();
