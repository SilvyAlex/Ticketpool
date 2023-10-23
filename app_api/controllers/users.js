// controllers
const mongoose = require('mongoose'); // incorporar mongoose a la REST API
const users = mongoose.model('user'); // el modelo me permite interactuar con la colección users

// crear usuario
const userCreate = (req, res) => {
    users
        .create({ // req.body.xxxx hace referencia al contenido que viene desde un formulario
            nombre: req.body.nombre,
            correo: req.body.correo,
            edad: req.body.edad,
            ciudad: req.body.ciudad,
            intereses: req.body.intereses
        })
        .then((objetoUsuario) => {
            res
                .status(201)
                .json(objetoUsuario);
        })
        .catch((err) => {
            res
                .status(400)
                .json(err);
        });
};

// listar usuarios
const userList = (req, res) => {
    users
        // .find({
        //     'apellido': 'Cisneros'
        // }) //obtiene todos los documentos de la colección users que cumplen con el criterio del filtro
        .find() //obtiene todos los documentos de la colección users
        // .select('nombre apellido') //muestra solo los paths (campos) especificados
        .exec()
        .then((objetoUsuario) => {
            if (objetoUsuario.length == 0) { // valido la existencia de documentos en la colección
                console.log(`No existen documentos en la colección ${users}`);
                return res // no existen documentos en la colección users
                    .status(404)
                    .json({ "Mensaje": "Usuarios no encontrados" });
            } else
                res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoUsuario);
        })
        .catch((err) => { //find encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Se encontró un error en la colección ${users}`);
        })
};

// leer usuario
const userRead = (req, res) => {
    users
        .findById(req.params.userid) //obtiene userid de los parámetros de la URL
        .exec()
        .then((objetoUsuario) => {
            if (!objetoUsuario) {
                console.log(`Usuario con userid ${req.params.userid} no encontrado`);
                return res // no existe un documento con ese userid
                    .status(404)
                    .json({
                        "Mensaje": "Usuario no encontrado"
                    });
            } else
                res //Responde enviando el documento encontrado en formato JSON y con status HTTP 200
                    .status(200)
                    .json(objetoUsuario);
        })
        .catch((err) => { //findById encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Error al buscar el usuario con userid: ${req.params.userid}`);
        });
}

// buscar por nombre/apellido/identificación
const userFindName = (req, res) => {
    const buscar = new RegExp(req.params.name); // permitir buscar la ocurrencia de un texto en path
    console.log('Buscar usuario con nombre: ', buscar);
    users
        // .find({
        //     'nombre': buscar // buscar la ocurrencia de un texto en un path
        // })
        .find({
            'identificacion': req.params.name // búsqueda exacta en un path
        })
        .exec()
        .then((objetoUsuario) => {
            if (objetoUsuario.length == 0) {
                console.log('No existen documentos con nombre: ', buscar);
                return res
                    .status(404)
                    .json({
                        'Mensaje: ': 'usuario no encontrado con nombre: ' + buscar
                    })
            } else {
                console.log('Se encontró el documento con nombre: ', buscar);
                return res
                    .status(200)
                    .json(objetoUsuario);
            }
        })
        .catch((err)=>{
            console.log('Se encontró un error en la colección: ', users, ' con nombre: ', buscar);
            return res
                .status(404)
                .json(err);
        });
}

// modificar usuarios
const userUpdate = (req, res) => {
    users
        .findById(req.params.userid)
        .exec()
        .then((objetoUsuario)=>{
            objetoUsuario.nombre = req.body.nombre;
            objetoUsuario.correo = req.body.apellido;
            objetoUsuario.edad = req.body.edad;
            objetoUsuario.ciudad = req.body.ciudad;
            objetoUsuario.intereses = req.body.intereses;
            objetoUsuario.intereses.Cine = req.body.Cine;
            objetoUsuario.intereses.Arte = req.body.Arte;
            objetoUsuario.intereses.Lectura = req.body.Lectura;
            objetoUsuario
                .save()
                .then((users)=>{
                    res
                        .status(200)
                        .json(users);
                })
                .catch((err)=>{
                    res
                        .status(400)
                        .json(err);
                }
                );
        })
        .catch((err)=>{
            res
                .status(404)
                .json(err);
        });
};

// eliminar usuarios
const userDelete = (req, res) => {
    if (req.params.userid) {
        users
            .findByIdAndDelete(req.params.userid)
            .exec()
            .then((objetoUsuario)=>{
                if (!objetoUsuario) {
                    console.log(`Usuario con userid ${req.params.userid} no encontrado`);
                    return res // no existe un documento con ese userid
                        .status(404)
                        .json({
                            "Mensaje": "Usuario no encontrado"
                        });
                }
                res
                    .status(204)
                    .json(null);
            }
            )
            .catch((err)=>{
                    res
                        .status(404)
                        .json(err);
                }
            );
    }
};

module.exports = {
    userCreate,  // crear usuario
    userList,    // listar usuarios
    userRead,    // leer usuario
    userUpdate,  // actualizar usuario
    userDelete,  // eliminar usuario
    userFindName // buscar por nombre/apellido
}