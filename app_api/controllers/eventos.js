//Uso de mongoose y el modelo compilado para acceder a la DB
const mongoose = require('mongoose'); // incorporo mongoose al REST APi
const eventos = mongoose.model('evento'); // el modelo me permite interactuar con la colección users

// Controladores
const eventoCreate = (req, res) => {
    eventos
        .create({
            nombre: req.body.nombre,
            fecha: req. body.fecha,
            ubicacion: req. body.ubicacion,
            descripcion: req. body.descripcion,
        })
        .then((objetoEvento)=> {
            res
                .status(201)
                .json(objetoEvento);
        })
        .catch((err) => {
            res
                .status(400)
                .json(err);
        });
};
const eventoList = (req, res) => {
    eventos
        .find()
        .exec()
        .then((objetoEvento) => {
            if (!objetoEvento) { // valido la existencia de documentos en la colección
              console.log(`No existen documentos en la colección ${eventos}`);
              return res // no existen documentos en la colección users
                  .status(404)
                  .json({
                      "Mensaje": "Eventos no encontrados"
                  });
          } else 
           res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
               .status(200)
               .json(objetoEvento);
       })
       .catch((err) => { //find encontró un error
           res
               .status(404)
               .json({ "status": "error list" });
           console.log(`Se encontró un error en la colección ${eventos}`);
       })
};
const eventoRead = (req, res) => {
    eventos
        .findById(req.params.eventoid)
        .exec()
        .then((objetoEvento)=>{
            res
                .status(200)
                .json(objetoEvento);
        })
        .catch((err) => {
            res
                .status(404)
                .json({"status":"error read"});
            console.log(`Error al buscar el evento ${req.params.eventoid}`);
        })
        
};
const eventoUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "success update" });
};
const eventoDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "success delete" });
};

module.exports = {
    eventoCreate,
    eventoList,
    eventoRead,
    eventoUpdate,
    eventoDelete
};