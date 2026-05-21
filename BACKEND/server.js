//Empezamos importando express y creando la app, luego levantamos el servidor

const express = require('express')
const link = require('./config/db')
const clientesRoutes= require('./routes/clientesRoutes')
const logsRoutes = require('./routes/logsRoutes')
const vehiculosRoutes = require('./routes/vehiculosRoutes')
const reparacionesRoutes = require('./routes/reparacionesRoutes')
const piezasRoutes = require('./routes/piezasRoutes')
const piezRepRoutes = require('./routes/piez_reparRoutes')

const mongo = require('./config/mongo')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../FRONTEND')))


//Rutas clientes
app.use('/api/clientes', clientesRoutes)

//Rutas vehiculos
app.use('/api/vehiculos', vehiculosRoutes)

//Rutas logs
app.use('/api/logs', logsRoutes)

//Rutas reparaciones
app.use('/api/reparaciones', reparacionesRoutes)

//Rutas piezas
app.use('/api/piezas', piezasRoutes)

//Rutas tabla intermedia

app.use('/api/reparaciones/piezas', piezRepRoutes)


// SPA
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../FRONTEND/index.html'))
})

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor en puerto ${PORT}`)
    })
}

module.exports = app