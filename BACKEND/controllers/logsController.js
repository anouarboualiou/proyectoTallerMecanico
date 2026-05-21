

const Log = require('../models/logReparacion')

async function addLog(req, res) {

    const { vehiculo_id,
        descripcion,
        prioridad,
        estado,
        metadatos} = req.body

    if (!vehiculo_id || !descripcion || !prioridad || !estado) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        })
    }
    
    try{

        const nuevoLog = await Log.create({
            vehiculo_id: vehiculo_id,
            descripcion: descripcion,
            prioridad: prioridad,
            estado: estado,
            metadatos: metadatos,
            fecha: new Date()

        })

        res.status(201).json(nuevoLog)

    }
    catch(error) {
        res.status(500).json({
            error: 'Error al crear log',
            detalle: error.message
        })
    }
}


async function getLogs(req, res) {

    try{

        const logs = await Log.find()

        res.json(logs)
    }
    catch(error){
        res.status(500).json({
            error:'No se ha podido obtener los logs',
            detalle: error.message
        })
    }
    
}

async function updateLog(req, res) {

    const { id } = req.params

    const {
        descripcion,
        prioridad,
        estado,
        metadatos
    } = req.body

    try {

        await Log.findByIdAndUpdate(
            id,
            {
                descripcion,
                prioridad,
                estado,
                metadatos
            }
        )

        res.json({
            mensaje: 'Log actualizado'
        })

    } catch(error) {

        res.status(500).json({
            error: 'Error al actualizar log'
        })
    }
}

async function deleteLog(req, res) {

    const { id } = req.params

    try {

        const logEliminado = await Log.findByIdAndDelete(id)

        if (!logEliminado) {
            return res.status(404).json({
                error: 'Log no encontrado'
            })
        }

        res.json({
            mensaje: 'Log eliminado correctamente'
        })

    } catch(error) {

        res.status(500).json({
            error: 'Error al eliminar log',
            detalle: error.message
        })
    }
}

module.exports = {
    addLog,
    getLogs,
    updateLog,
    deleteLog,
}