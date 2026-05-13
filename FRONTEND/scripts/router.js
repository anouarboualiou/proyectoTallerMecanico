
const app = document.getElementById("app")

async function cargarVista(view) {

    try {

        const viewBase = view.split('/')[0]

        const path = window.location.pathname

        //Clientes editar

        if(path.startsWith('/clientes/editar/')) {

            const id = path.split('/')[3]

            const res = await fetch('/views/clienteEditar.html')
            const html = await res.text()

            app.innerHTML = html

            cargarEditarCliente(id)

            return
        }

        //Vehiculos editar

        if(path.startsWith('/vehiculos/editar/')) {

            const id = path.split('/')[3]

            const res = await fetch('/views/vehiculoEditar.html')
            const html = await res.text()

            app.innerHTML = html

            cargarEditarVehiculo(id)

            return
        }

        //Vehiculo nuevo

        if(path === '/vehiculos/nuevo') {

            const res = await fetch('/views/vehiculoNuevo.html')
            const html = await res.text()

            app.innerHTML = html

            iniciarFormularioVehiculo()

            return
        }

        // CLIENTE DETALLE
        if(path.startsWith('/clientes/')) {

            const id = path.split('/')[2]

            const res = await fetch('/views/clienteDetalles.html')

            if(!res.ok) {
                throw new Error('Vista detalle no encontrada')
            }

            const html = await res.text()

            app.innerHTML = html

            cargarDetalleCliente(id)

            return
        }

        // Reparacion Nueva

        if(path.startsWith('/reparaciones/nueva/')) {

            const vehiculoId = path.split('/')[3]

            const res = await fetch(
                '/views/reparacionNueva.html'
            )

            const html = await res.text()

            app.innerHTML = html

            iniciarFormularioReparacion(vehiculoId)

            return
        }

        //log nuevo

        if(path.startsWith('/logs/nuevo/')) {

            const id = path.split('/')[3]

            const res = await fetch('/views/logNuevo.html')

            const html = await res.text()

            app.innerHTML = html

            iniciarFormularioLog(id)

            return
        }

        //Vehiculo detalle

        if(
    path.startsWith('/vehiculos/') && !path.startsWith('/vehiculos/editar/')) {

        const id = path.split('/')[2]

        const res = await fetch(
            '/views/vehiculoDetalle.html'
        )

        const html = await res.text()

        app.innerHTML = html

        cargarDetalleVehiculo(id)

        return
    }

        const vistasValidas = [

            'dashboard',
            'clientes',
            'vehiculos',
            'logs',
            'reparaciones'
        ]

        // =========================
        // 404
        // =========================

        if(!vistasValidas.includes(viewBase)) {

            const res = await fetch('/views/404.html')

            const html = await res.text()

            app.innerHTML = html

            return
        }


        // =========================
        // CARGAR VISTA
        // =========================

        const res = await fetch(`/views/${viewBase}.html`)

        if (!res.ok) {
            throw new Error('Vista no encontrada')
        }

        const html = await res.text()

        app.innerHTML = html

        switch (viewBase) {

            case 'dashboard':
                cargarDashboard()
                break

            case 'clientes':
                cargarClientes()
                break

            case 'vehiculos':
                cargarVehiculos()
                break

            case 'logs':
                cargarLogs()
                break

            case 'reparaciones':
                cargarReparaciones()
                break
        }

    }
    catch (error) {

        console.error(error)

       const res = await fetch('/views/error.html')

        const html = await res.text()

        app.innerHTML = html

    }



}

function navegarHacia(view) {

    history.pushState({}, '', `/${view}`)
    cargarVista(view)

}

window.addEventListener('popstate', () => {

    const view = window.location.pathname.substring(1) || 'dashboard'

    cargarVista(view)
})

window.addEventListener('load', () => {

    const view = window.location.pathname.substring(1) || 'dashboard'

    cargarVista(view)
})
