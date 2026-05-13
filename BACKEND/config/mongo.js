

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/taller_mecanico')

    .then(() => {

        console.log('MongoDB conectado con éxito')
    })
    .catch((error) => {

        e.error('Error al conectar MongoDB', error)
    })


module.exports = mongoose