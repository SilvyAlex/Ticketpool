const mongoose = require('mongoose');

const eventosSchema = new mongoose.Schema({
    imagen: {
        type: String,
        required: true
      },
      nombre: {
        type: String,
        required: true
      },
      introduccion: {
        type: String,
        required: true
      },
      fecha: {
        type: Date,
        'default': Date.now
      },
      ubicacion: {
        type: String,
        required: true
      },
      genero: {
        type: String,
        required: true
      },
      redes: {
        type: String,
        required: true
      },
      descripcion: {
        type: String,
        required: true
      },
      fotos: {
        type: String,
        required: true
      }
});

const Evento = new mongoose.model('evento', eventosSchema);

const evento = new Evento({
    nombre: 'Juan',
    ubicacion: 'Perez',
    descripcion: 'Quito',
});

// user.save();
