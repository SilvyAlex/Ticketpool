//controller

let usuarios = [
  {
    nombre: 'Martin',
    apellido: 'Mafal',
    direccion: 'Quito'
  },
  {
    nombre: 'Mateo',
    apellido: 'Bonilla',
    direccion: 'Cumbaya'
  },
  {
    nombre: 'Fernanda',
    apellido: 'Quinteros',
    direccion: 'Tumbaco'
  },
]


//home page GET
const users = (req, res, next) => {
  res.render('users', { title: 'Listado de Usuarios', usuarios});
};

module.exports = {
   users //users = GET
};