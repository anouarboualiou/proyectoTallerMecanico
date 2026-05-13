const db = require('../config/db')

function getPiezas(req, res) {

    const sql = `
        SELECT *
        FROM piezas
        ORDER BY piez_nombre
    `

    db.query(sql, (error, resultado) => {

        if(error) {

            return res.status(500).json({
                error: 'Error al obtener piezas'
            })
        }

        res.json(resultado)
    })
}

module.exports = {getPiezas}