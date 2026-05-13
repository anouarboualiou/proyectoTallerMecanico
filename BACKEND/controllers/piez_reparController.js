const db = require('../config/db')

function addPiezaReparacion(req, res) {

    const {
        rep_id,
        piez_id,
        cantidad
    } = req.body

    const sql = `
        INSERT INTO reparaciones_piezas
        (
            rep_id,
            piez_id,
            cantidad
        )
        VALUES (?, ?, ?)
    `

    db.query(
        sql,
        [rep_id, piez_id, cantidad],
        (error, resultado) => {

            if(error) {

                return res.status(500).json({
                    error: 'Error al guardar pieza reparación',
                    detalle: error
                })
            }

            res.status(201).json({
                mensaje: 'Pieza añadida'
            })
        }
    )
}

module.exports = {addPiezaReparacion}