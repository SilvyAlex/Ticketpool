// esquema de la colección usuarios - dw3_202310_users

const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    edad: {
        type: Number,
        'default': 1,
        min: 1,
        max: 100,
    },
    ciudad: {
        type: String,
        require: true
    },
    intereses: {
        type: [String],
        require: true
    }
});

const Usuario = new mongoose.model('user', usuariosSchema);

const user = new Usuario({
    nombre: 'Juan',
    correo: 'Perez',
    edad: 22,
    ciudad: 'Perez',
   intereses: 
   ['Cine', 'Lectura']
});

// user.save();
