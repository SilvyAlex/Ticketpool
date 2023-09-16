const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');
const readLine = require('readline'); //para leer la línea de comandos

const usuariosSchema = new Mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    identificacion: {
        type: Number,
        require: true
    },
    direccion: {
        type: String,
    },
    edad: {
        type: Number,
        'default': 1,
        min: 1,
        max: 100
    },
    telefono: {
        type: Number,
        'default': 9999999999,
    },
    materias: {
        tipo: {
            type: String,
            enum: ['Presencial', 'Virtual'],
            require: true
        },
        nombres: [String]
    },
    carrera: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

const Usuarios = new mongoose.model('users', usuariosSchema);

const user = new Usuarios({
    nombre: 'Mark',
    apellido: 'Otto',
    identificacion: 172389234,
    direccion: 'Santa Ines',
    edad: 20,
    telefono: 1234567890,
    materias: {
        tipo: 'Presencial',
        nombres: ['Matematicas', 'Ingles']
    },
    carrera: 'Sistemas',
    fecha: Date.now()
});

user.save();