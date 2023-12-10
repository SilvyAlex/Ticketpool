//Uso de mongoose y el modelo compilado para acceder a la DB
const mongoose = require('mongoose'); // incorporo mongoose al REST APi
const pagos = mongoose.model('pago'); // el modelo me permite interactuar con la colección users

// Controladores
const pagoCreate = (req, res) => {
    pagos
        .create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            metodo: req.body.metodo,
            tarjeta: req.body.tarjeta,
            numero: req.body.numero,
            vence: req.body.vence,
            cvv: req.body.cvv,
        })
        .then((objetoPago)=> {
            res
                .status(201)
                .json(objetoPago);
        })
        .catch((err) => {
            res
                .status(400)
                .json(err);
        });
};
const pagoList = (req, res) => {
    pagos
        .find()
        .exec()
        .then((objetoPago) => {
            if (objetoPago.length == 0) { // valido la existencia de documentos en la colección
                console.log(`No existen documentos en la colección ${pagos}`);
                return res // no existen documentos en la colección pago
                    .status(404)
                    .json({ "Mensaje": "Pago no encontrados" });
            } else
                res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoPago);
        })
        .catch((err) => { //find encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Se encontró un error en la colección ${pagos}`);
        })
};
const pagoRead = (req, res) => {
    pagos
        .findById(req.params.pagoid)
        .exec()
        .then((objetoPago)=>{
            if (!objetoPago) {
                console.log(`Pago con pagoid ${req.params.pagoid} no encontrado`);
                return res // no existe un documento con ese pagoid
                    .status(404)
                    .json({
                        "Mensaje": "Pago no encontrado"
                    });
            } else
                res //Responde enviando el documento encontrado en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoPago);
        })
        .catch((err) => { //findById encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Error al buscar el usuario con pagoid: ${req.params.pagoid}`);
        });
};
const pagoUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "success update" });
};
const pagoDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "success delete" });
};

module.exports = {
    pagoCreate,
    pagoList,
    pagoRead,
    pagoUpdate,
    pagoDelete
};