

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log('MongoDB conectado con éxito')
    })
    .catch((error) => {

        console.error('Error al conectar MongoDB', error)
    })


module.exports = mongoose