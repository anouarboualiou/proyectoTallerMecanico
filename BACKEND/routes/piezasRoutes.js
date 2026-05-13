const express = require('express')
const router = express.Router()
const controller = require('../controllers/piezasController')

//GET -> obtener piezas
router.get('/', controller.getPiezas)

module.exports = router