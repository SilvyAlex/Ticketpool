const mongoose = require('mongoose');

const pagosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    pais: {
        type: [String], 
        required: true
    },
    ciudad: {
        type: [String], 
        required: true
    },
    metodo: {
        type: [String], 
        required: true
    },
    tarjeta: {
        type: String, 
        required: true
    },
    numero: {
        type: String, 
        required: true
    },
    vence: {
        type: String, 
        required: true
    },
    cvv: {
        type: String
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
    targeta: 'Juan Perez',
    numero: '123456789123',
    vence: '12/26',
    cvv: '123',
});

// user.save();
