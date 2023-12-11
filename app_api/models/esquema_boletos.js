const mongoose = require('mongoose');

const boletosSchema = new mongoose.Schema({
    asiento: {
        type: Buffer,
        require: true
    },
    precio: {
        type: String,
        require: true
    },
    cantidad: {
        type: String,
        require: true
    }
});

//Registra el esquema con Mongoose
const Boleto = new mongoose.model('boleto', boletosSchema);

// Ahora puedes usar el modelo boleto en tu aplicación
const boleto = new Boleto({
    asiento: '3F',
    precio: '$20',
    cantidad: '2',
});

// user.save();
