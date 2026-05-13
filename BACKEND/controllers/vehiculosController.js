

const db = require('../config/db')

function getVehiculos(req, res) {

    const sql = `SELECT v.*, c.cli_nombre 
                FROM vehiculos v
                INNER JOIN clientes c
                ON v.cli_id = c.cli_id
                `

    db.query(sql, (error, resultado) => {

        if (error) {

            return res.status(500).json({
                error: 'Error al obtener los clientes',
                detalle: error
            })
        }

        res.json(resultado)
    })

}

function getVehiculoById(req, res) {

    const { id } = req.params

    const sql = `
        SELECT v.*, c.cli_nombre
        FROM vehiculos v

        INNER JOIN clientes c
        ON v.cli_id = c.cli_id

        WHERE v.veh_id = ?
    `

    db.query(sql, [id], (error, resultado) => {

        if(error) {

            return res.status(500).json({
                error: 'Error al obtener vehículo',
                detalle: error
            })
        }

        if(resultado.length === 0) {

            return res.status(404).json({
                error: 'Vehículo no encontrado'
            })
        }

        res.json(resultado[0])
    })
}

function getVehiculosByCliente(req, res) {

    const { id } = req.params

    const sql = `
        SELECT *
        FROM vehiculos
        WHERE cli_id = ?
    `

    db.query(sql, [id], (error, resultado) => {

        if (error) {

            return res.status(500).json({
                error: 'Error al obtener vehículos',
                detalle: error
            })
        }

        res.json(resultado)
    })
}


function addVehiculo(req, res) {

    const { veh_marca, veh_modelo, veh_imagen, veh_matricula, veh_motor, veh_combustible, cli_id } = req.body

    if (!veh_marca || !veh_modelo || !veh_matricula || !veh_motor || !veh_combustible || !cli_id) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        })
    }

    const matriculaFormato = /^[0-9]{4}[A-Z]{3}$/

    if (!matriculaFormato.test(veh_matricula)) {
        return res.status(400).json({
            error: 'Matrícula inválida (formato 1234ABC)'
        })
    }

    const sql = `INSERT INTO vehiculos(veh_marca, veh_modelo, veh_imagen, veh_matricula, veh_motor, veh_combustible , cli_id) 
                VALUES(?,?,?,?,?,?,?)`

    db.query(sql, [veh_marca, veh_modelo, veh_imagen, veh_matricula, veh_motor, veh_combustible, cli_id], (error, resultado) => {

        if (error) {
            return res.status(500).json({
                detalle: error,
                error: 'No se ha insertado el vehiculo correctamente'
            })
        }

        return res.status(201).json({
            mensaje: 'Se ha insertado el vehiculo con exito',
            id: resultado.insertId
        })
    })
}

const Log = require('../models/logReparacion')

async function deleteVehiculo(req, res) {


    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: 'ID requerido' })
    }

    try {

        // =========================
        // ELIMINAR LOGS
        // =========================

        await Log.deleteMany({
            vehiculo_id: id
        })

        // =========================
        // ELIMINAR VEHICULO
        // =========================

        const sql =
            'DELETE FROM vehiculos WHERE veh_id = ?'

        db.query(sql, [id], (error, resultado) => {

            if(error) {

                return res.status(500).json({
                    error:
                        'Error al eliminar vehículo'
                })
            }

            res.json({
                mensaje:
                    'Vehículo eliminado correctamente'
            })
        })

    } catch(error) {

        res.status(500).json({
            error:
                'Error eliminando logs',
            detalle: error
        })
    }
}

function updateVehiculo(req, res) {

    const { id } = req.params

    const { veh_marca, veh_modelo, veh_imagen, veh_matricula, veh_motor, veh_combustible, cli_id } = req.body

    if (!id) {
        return res.status(400).json({ error: 'ID requerido' })
    }

    if (!veh_marca || !veh_modelo || !veh_matricula || !veh_motor || !veh_combustible || !cli_id) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        })
    }

    const matriculaFormato = /^[0-9]{4}[A-Z]{3}$/

    if (!matriculaFormato.test(veh_matricula)) {
        return res.status(400).json({
            error: 'Matrícula inválida (formato 1234ABC)'
        })
    }

    const sql = `UPDATE vehiculos SET veh_marca = ?, veh_modelo = ?, veh_imagen = ?, veh_matricula = ?, veh_motor = ?, veh_combustible = ?, cli_id = ?
                WHERE veh_id = ?`

    db.query(sql, [veh_marca, veh_modelo, veh_imagen, veh_matricula, veh_motor, veh_combustible, cli_id, id], (error, resultado) => {

        if (error) {

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    error: 'La matrícula ya existe'
                })
            }

            return res.status(500).json({
                error: 'Error al actualizar el vehiculo',
                detalle: error
            })

        }


        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Vehiculo no encontrado' })
        }

        return res.status(200).json({
            mensaje: 'Vehiculo actualizado con éxito'
        })
    })

}



module.exports = {
    getVehiculos,
    getVehiculoById,
    getVehiculosByCliente,
    addVehiculo,
    deleteVehiculo,
    updateVehiculo
}