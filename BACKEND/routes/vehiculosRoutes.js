const express = require('express')
const router = express.Router()
const controller = require('../controllers/vehiculosController')

//GET -> obtener vehiculos
router.get('/', controller.getVehiculos)
router.get('/:id', controller.getVehiculoById)

// GET -> obtener vehículos de un cliente
router.get('/cliente/:id', controller.getVehiculosByCliente)


//POST -> crear vehiculo
router.post('/', controller.addVehiculo)

//DELETE -> eliminar vehiculo
router.delete('/:id', controller.deleteVehiculo)

//PUT -> actualizar vehiculo
router.put('/:id', controller.updateVehiculo)

module.exports = router
