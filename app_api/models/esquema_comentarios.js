const mongoose = require('mongoose');

const comentariosSchema = new mongoose.Schema({
    correo: {
        type: String,
        require: true
    },

    comentario: {
        type: String,
        require: true
    }
});

const Comentario = new mongoose.model('comentario', comentariosSchema);

const evento = new Comentario({
    correo: 'juan@gmail.com',
    Comentario: 'Tuve un problema al comprar la entrada',
});

// user.save();