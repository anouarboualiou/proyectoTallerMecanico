
const express = require('express')
const router = express.Router()
const controller = require('../controllers/logsController')

//GET -> obtener logs
router.get('/', controller.getLogs)

//POST -> crear logs
router.post('/', controller.addLog)

//PUT -> editar logs

router.put('/:id', controller.updateLog)


module.exports = router
