
const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientesController')

//GET -> obtener clientes
router.get('/', controller.getClientes)

router.get('/:id', controller.getClienteById)

//POST -> crear cliente
router.post('/', controller.addCliente)

//DELETE -> eliminar cliente
router.delete('/:id', controller.deleteCliente)

//PUT -> actualizar cliente
router.put('/:id', controller.updateCliente)

module.exports = router

