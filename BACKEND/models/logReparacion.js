
const mongoose = require('mongoose')

const esquemaLog = new mongoose.Schema({

    vehiculo_id : Number,
    descripcion: String,
    prioridad: String,
    estado: String,
    metadatos: Object,
    fecha: Date
})

const Log = mongoose.model('Log', esquemaLog)

module.exports = Log