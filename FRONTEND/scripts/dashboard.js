
async function cargarDashboard() {

    const totalClientes = document.getElementById('totalClientes')
    const totalVehiculos = document.getElementById('totalVehiculos')
    const totalLogs = document.getElementById('totalLogs')
    const logsCriticos = document.getElementById('logsCriticos')

    if (!totalClientes || !totalVehiculos || !totalLogs || !logsCriticos) {
        return
    }

    const ultimosVehiculosList = document.getElementById("ultimosVehiculos")
    const ultimosLogsList = document.getElementById("ultimosLogs")

    const resClientes = await fetch('/api/clientes')
    const clientes = await resClientes.json()

    const resVehiculos = await fetch('/api/vehiculos')
    const vehiculos = await resVehiculos.json()

    const resLogs = await fetch('/api/logs')
    const logs = await resLogs.json()

    //Asignamos los numeros de las estadisticas

    totalClientes.textContent = clientes.length
    totalVehiculos.textContent = vehiculos.length
    totalLogs.textContent = logs.length

    //Logs criticos

    const logsAlta = logs.filter(log => log.prioridad === 'Alta')
    logsCriticos.textContent = logsAlta.length

    //Ultimos 5 vehiculos y logs

    const ultimosVehiculos = vehiculos.slice(-5)

    ultimosVehiculos.forEach(vehiculo => {

         let colorBadge = 'bg-secondary'

        if(vehiculo.veh_combustible === 'Diesel') {
            colorBadge = 'bg-dark'
        }
        else if(vehiculo.veh_combustible === 'Gasolina') {
            colorBadge = 'bg-danger'
        }
        else if(vehiculo.veh_combustible === 'Híbrido') {
            colorBadge = 'bg-success'
        }
        else if(vehiculo.veh_combustible === 'Eléctrico') {
            colorBadge = 'bg-info'
        }

        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = `
            <div>
                <strong>${vehiculo.veh_marca} ${vehiculo.veh_modelo}</strong>
                <div class="text-muted small">
                    Matrícula: ${vehiculo.veh_matricula}
                </div>
            </div>

            <span class="badge ${colorBadge}">
                ${vehiculo.veh_combustible}
            </span>
        
        `

        ultimosVehiculosList.append(li)
    
    })
    
    const ultimosLog = logs.slice(-5)

    

    ultimosLog.forEach(log => {

        let colorBadge = ''

        if (log.prioridad === 'Alta') {
            colorBadge = 'bg-danger'
        }
        else if (log.prioridad === 'Media') {
            colorBadge = 'bg-warning'
        }
        else {
            colorBadge = 'bg-success'
        }
        
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = `
            <div>
                <strong>${log.descripcion}</strong>
                <div class="text-muted small">
                    Estado: ${log.estado}
                </div>
            </div>

            <span class="badge ${colorBadge}">
                ${log.prioridad}
            </span>
        
        `

        ultimosLogsList.append(li)
    
    })

    
}

