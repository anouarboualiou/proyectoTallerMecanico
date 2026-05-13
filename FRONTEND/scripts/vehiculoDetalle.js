async function cargarDetalleVehiculo(id) {

    try {

        const res = await fetch(
            `http://localhost:3000/api/vehiculos/${id}`
        )

        const vehiculo = await res.json()

        document.getElementById(
            'vehiculoTitulo'
        ).textContent =

            `${vehiculo.veh_marca} ${vehiculo.veh_modelo}`

        document.getElementById(
            'vehiculoMatricula'
        ).textContent =

            vehiculo.veh_matricula

        document.getElementById(
            'vehiculoId'
        ).textContent =

            `#${vehiculo.veh_id}`

        document.getElementById(
            'vehiculoMotor'
        ).textContent =

            vehiculo.veh_motor

        document.getElementById(
            'vehiculoCliente'
        ).textContent =

            vehiculo.cli_nombre

        // =========================
        // BADGE COMBUSTIBLE
        // =========================

        const badge =
            document.getElementById(
                'badgeCombustible'
            )

        badge.textContent =
            vehiculo.veh_combustible

        let clases =
            'bg-secondary-subtle text-secondary'

        if(vehiculo.veh_combustible === 'Diesel') {

            clases =
                'bg-dark text-white'
        }

        if(vehiculo.veh_combustible === 'Gasolina') {

            clases =
                'bg-danger-subtle text-danger'
        }

        if(vehiculo.veh_combustible === 'Híbrido') {

            clases =
                'bg-success-subtle text-success'
        }

        if(vehiculo.veh_combustible === 'Eléctrico') {

            clases =
                'bg-info-subtle text-info'
        }

        badge.className =
            `badge rounded-pill px-4 py-2 ${clases}`

        // =========================
        // BOTONES
        // =========================

        document.getElementById(
            'btnEditarVehiculo'
        ).addEventListener('click', () => {

            navegarHacia(
                `vehiculos/editar/${vehiculo.veh_id}`
            )
        })

        document.getElementById(
            'btnNuevaReparacion'
        ).addEventListener('click', () => {

            navegarHacia(
                `reparaciones/nueva/${vehiculo.veh_id}`
            )
        })

        document.getElementById(
            'btnNuevoLog'
        ).addEventListener('click', () => {

            navegarHacia(
                `logs/nuevo/${vehiculo.veh_id}`
            )
        })

        // =========================
        // HISTORIAL REPARACIONES
        // =========================

        const historial =
            document.getElementById(
                'historialReparaciones'
            )

        const reparacionesRes =
            await fetch(
                `http://localhost:3000/api/reparaciones`
            )

        const reparaciones =
            await reparacionesRes.json()

        const filtradas =
            reparaciones.filter(rep =>

                rep.veh_id == id
            )

        if(filtradas.length === 0) {

            historial.innerHTML = `

                <div class="alert alert-light border rounded-4">

                    No hay reparaciones registradas

                </div>
            `

            return
        }

        filtradas.forEach(rep => {

            historial.innerHTML += `

                <div class="border rounded-4 p-4">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h5 class="fw-bold">

                                ${rep.rep_tipo}

                            </h5>

                            <p class="text-muted mb-0">

                                ${new Date(rep.rep_fecha)
                                    .toLocaleDateString('es-ES')}

                            </p>

                        </div>

                        <div class="text-end">

                            <div class="fw-bold">

                                ${rep.rep_precio}€

                            </div>

                            <small class="text-muted">

                                ${rep.rep_duracion}h

                            </small>

                        </div>

                    </div>

                </div>
            `
        })

    } catch(error) {

        console.error(error)
    }
}