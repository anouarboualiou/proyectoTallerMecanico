const express = require('express')
const router = express.Router()

const controller= require('../controllers/reparacionesController')

router.get('/', controller.getReparaciones)

router.get('/:id/detalle', controller.getReparacionDetalles)
router.get('/:id', controller.getReparacionById)

router.post('/', controller.addReparacion)
router.put('/:id', controller.updateReparacion)
router.delete('/:id', controller.deleteReparacion)

module.exports = router