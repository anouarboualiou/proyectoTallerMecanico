
const db = require('../config/db')

//Funcion con la que obtenemos los clientes de la bd

function getClientes(req, res) {

    db.query('SELECT * FROM clientes', (error, resultado) => {

        if (error) {
            return res.status(500).json(error)
        }

        res.json(resultado)
    })

}

function getClienteById(req, res) {

    const { id } = req.params

    const sql = 'SELECT * FROM clientes WHERE cli_id = ?'

    db.query(sql, [id], (error, resultado) => {

        if(error) {
            return res.status(500).json(error)
        }

        if(resultado.length === 0) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            })
        }

        res.json(resultado[0])
    })
}

function addCliente(req, res) {

    const { cli_nombre, cli_apellidos, cli_fecha_nac, cli_email, cli_telefono } = req.body

    //Validaciones 

    if (!cli_nombre || !cli_apellidos || !cli_fecha_nac || !cli_email || !cli_telefono ) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        })
    }

    const fecha = new Date(cli_fecha_nac)
    if (isNaN(fecha.getTime())){
        return res.status(400).json({
            error: 'Fecha inválida'
        })
    } 

    const sql = `INSERT INTO clientes (cli_nombre, cli_apellidos, cli_fecha_nac, cli_email, cli_telefono) VALUES (?,?,?,?,?)`

    db.query(sql, [cli_nombre, cli_apellidos, cli_fecha_nac, cli_email, cli_telefono], (error, resultado) => {

        if (error) {
            return res.status(500).json({
                detalle: error,
                error: 'Error al crear el cliente'
            })
        }

        res.status(201).json({
            mensaje: 'Cliente creado correctamente',
            id: resultado.insertId
        })
    })

}

//Continuar en casa haciendo las demas funciones

function deleteCliente(req, res) {


    const {id} = req.params 

    if (!id) {
        return res.status(400).json({ error: 'ID requerido' })
    }

    const sql = 'DELETE FROM clientes WHERE cli_id = ?'

    db.query(sql,[id], (error, resultado) => {

        if (error) {
            return res.status(500).json({error: 'Error al eliminar cliente'})
        }
        
        if(resultado.affectedRows === 0) {
            return res.status(404).json({error: 'Cliente no encontrado'})
        }

        res.json(resultado)
    })

}

function updateCliente(req, res) {

    const {id} = req.params

    const {cli_nombre, cli_apellidos, cli_fecha_nac, cli_email, cli_telefono} = req.body

    if (!cli_nombre || !cli_apellidos || !cli_fecha_nac || !cli_email || !cli_telefono) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        })
    }

    const sql = `UPDATE clientes 
                SET cli_nombre = ?, cli_apellidos = ?, cli_fecha_nac = ?, cli_email = ?, cli_telefono = ?
                WHERE cli_id = ?
    `
    db.query(sql, [cli_nombre, cli_apellidos, cli_fecha_nac, cli_email, cli_telefono, id], (error, resultado) => {

        if (error) {
            return res.status(500).json(error)
        }

        if(resultado.affectedRows === 0) {
            return res.status(404).json({error: 'Cliente no encontrado'})
        }

        res.json(resultado)
    })

}

module.exports = {
    getClientes,
    getClienteById,
    addCliente,
    deleteCliente,
    updateCliente
}