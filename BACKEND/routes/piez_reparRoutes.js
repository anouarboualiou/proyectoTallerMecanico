const express = require('express')
const router = express.Router()

const piezReparController = require('../controllers/piez_reparController')

router.post('/', piezReparController.addPiezaReparacion)

module.exports = router