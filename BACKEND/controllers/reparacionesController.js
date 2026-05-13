const db = require('../config/db')

async function getReparaciones(req, res) {

    const sql = `
        SELECT 
            r.*,
            v.veh_marca,
            v.veh_modelo,
            v.veh_matricula
        FROM reparaciones r

        INNER JOIN vehiculos v
        ON r.veh_id = v.veh_id
    `

    db.query(sql, (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        res.json(resultado)
    })
}

async function addReparacion(req, res) {

    const {
        rep_fecha,
        rep_tipo,
        rep_duracion,
        rep_garantia,
        rep_precio,
        veh_id
    } = req.body

    const sql = `
        INSERT INTO reparaciones
        (rep_fecha, rep_tipo, rep_duracion, rep_garantia, rep_precio, veh_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    db.query(sql, [

        rep_fecha,
        rep_tipo,
        rep_duracion,
        rep_garantia,
        rep_precio,
        veh_id

    ], (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        res.status(201).json({
            mensaje: 'Reparación creada',
            id: resultado.insertId
        })
    })
}

async function deleteReparacion(req, res) {

    const { id } = req.params

    const sql = 'DELETE FROM reparaciones WHERE rep_id = ?'

    db.query(sql, [id], (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        res.json({
            mensaje: 'Reparación eliminada'
        })
    })
}

async function getReparacionById(req, res) {

    const { id } = req.params

    const sql = 'SELECT * FROM reparaciones WHERE rep_id = ?'

    db.query(sql, [id], (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        res.json(resultado[0])
    })
}

async function getReparacionDetalles(req, res) {

    const {id} = req.params

    const sql = `

    SELECT
    r.*,

    v.veh_marca,
    v.veh_modelo,
    v.veh_matricula,

    p.piez_nombre,
    p.piez_precio,

    rp.cantidad

    FROM reparaciones r

    INNER JOIN vehiculos v
    ON r.veh_id = v.veh_id

    LEFT JOIN reparaciones_piezas rp
    ON r.rep_id = rp.rep_id

    LEFT JOIN piezas p
    ON rp.piez_id = p.piez_id

    WHERE r.rep_id = ?
    
    `

    db.query(sql, [id], (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        res.json(resultado)
    })

    
}

async function updateReparacion(req, res) {

    const { id } = req.params

    const {
        rep_fecha,
        rep_tipo,
        rep_duracion,
        rep_garantia,
        rep_precio,
        veh_id
    } = req.body

    const sql = `
        UPDATE reparaciones
        SET
        rep_fecha = ?,
        rep_tipo = ?,
        rep_duracion = ?,
        rep_garantia = ?,
        rep_precio = ?,
        veh_id = ?
        WHERE rep_id = ?
    `

    db.query(sql, [

        rep_fecha,
        rep_tipo,
        rep_duracion,
        rep_garantia,
        rep_precio,
        veh_id,
        id

    ], (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        res.json({
            mensaje: 'Reparación actualizada'
        })
    })
}



module.exports = {
    getReparaciones,
    addReparacion,
    deleteReparacion,
    getReparacionById,
    getReparacionDetalles,
    updateReparacion
}