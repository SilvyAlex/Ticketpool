const mongoose = require('mongoose'); // incorporo mongoose al REST APi
const boletos = mongoose.model('boleto'); // el modelo me permite interactuar con la colección users

// Controladores
const boletoCreate = (req, res) => {
    boletos
        .create({
            evento: req.body.evento,
            fecha: req.body.fecha,
            hora: req.body.hora,
            lugar: req.body.lugar,
            asientos: req.body.asientos,
        })
        .then((objetoBoleto)=> {
            res
                .status(201)
                .json(objetoBoleto);
        })
        .catch((err) => {
            res
                .status(400)
                .json(err);
        });
};
const boletoList = (req, res) => {
    boletos
        .find()
        .exec()
        .then((objetoBoleto) => {
            if (objetoBoleto.length == 0) { // valido la existencia de documentos en la colección
                console.log(`No existen documentos en la colección ${boletos}`);
                return res // no existen documentos en la colección boletos
                    .status(404)
                    .json({ "Mensaje": "Boletos no encontrados" });
            } else
                res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoBoleto);
        })
        .catch((err) => { //find encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Se encontró un error en la colección ${boletos}`);
        })
};
const boletoRead = (req, res) => {
    boletos
        .findById(req.params.boletoid)
        .exec()
        .then((objetoBoleto)=>{
            if (!objetoBoleto) {
                console.log(`Boleto con boletoid ${req.params.boletoid} no encontrado`);
                return res // no existe un documento con ese boletoid
                    .status(404)
                    .json({
                        "Mensaje": "Boleto no encontrado"
                    });
            } else
                res //Responde enviando el documento encontrado en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoBoleto);
        })
        .catch((err) => { //findById encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Error al buscar el usuario con boletoid: ${req.params.boletoid}`);
        });
};
const boletoUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "success update" });
};
const boletoDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "success delete" });
};

module.exports = {
    boletoCreate,
    boletoList,
    boletoRead,
    boletoUpdate,
    boletoDelete
};