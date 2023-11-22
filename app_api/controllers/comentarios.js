//Uso de mongoose y el modelo compilado para acceder a la DB
const mongoose = require('mongoose'); // incorporo mongoose al REST APi
const comentarios = mongoose.model('comentario'); // el modelo me permite interactuar con la colección users

// Controladores
const comentarioCreate = (req, res) => {
    comentarios
        .create({
            correo: req.body.correo,
            comentario: req.body.comentario,
        })
        .then((objetoComentario)=> {
            res
                .status(201)
                .json(objetoComentario);
        })
        .catch((err) => {
            res
                .status(400)
                .json(err);
        });
};
const comentarioList = (req, res) => {
    comentarios
        .find()
        .exec()
        .then((objetoComentario) => {
            if (objetoComentario.length == 0) { // valido la existencia de documentos en la colección
                console.log(`No existen documentos en la colección ${comentarios}`);
                return res // no existen documentos en la colección eventos
                    .status(404)
                    .json({ "Mensaje": "Comentarios no encontrados" });
            } else
                res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoComentario);
        })
        .catch((err) => { //find encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Se encontró un error en la colección ${comentarios}`);
        })
};
const comentarioRead = (req, res) => {
    comentarios
        .findById(req.params.comentarioid)
        .exec()
        .then((objetoComentario)=>{
            if (!objetoComentario) {
                console.log(`Evento con eventoid ${req.params.comentarioid} no encontrado`);
                return res // no existe un documento con ese comentarioid
                    .status(404)
                    .json({
                        "Mensaje": "Evento no encontrado"
                    });
            } else
                res //Responde enviando el documento encontrado en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoComentario);
        })
        .catch((err) => { //findById encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Error al buscar el Comentario con comentarioid: ${req.params.comentarioid}`);
        });
};
const comentarioUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "success update" });
};
const comentarioDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "success delete" });
};

module.exports = {
    comentarioCreate,
    comentarioList,
    comentarioRead,
    comentarioUpdate,
    comentarioDelete
};