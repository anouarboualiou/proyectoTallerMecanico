let logsGuardados = []

async function cargarLogs() {

    const contenedor =
        document.getElementById('contenedorLogs')

    // =========================
    // OBTENER LOGS
    // =========================

    async function obtenerLogs() {

        try {

            const res = await fetch(
                '/api/logs'
            )

            const logs = await res.json()

            logsGuardados = logs

            pintarLogs(logs)

        } catch (error) {

            console.error(error)
        }
    }

    // =========================
    // PINTAR LOGS
    // =========================

    function pintarLogs(logs) {

        contenedor.innerHTML = ''

        if (logs.length === 0) {

            contenedor.innerHTML = `

                <div class="col-12">

                    <div class="alert alert-light border rounded-4 shadow-sm">

                        No hay incidencias registradas

                    </div>

                </div>
            `

            return
        }

        logs.forEach(log => {

            // =========================
            // COLOR PRIORIDAD
            // =========================

            let prioridadClase =
                'bg-secondary-subtle text-secondary'

            if (log.prioridad === 'Alta') {

                prioridadClase =
                    'bg-danger-subtle text-danger'
            }

            if (log.prioridad === 'Media') {

                prioridadClase =
                    'bg-warning-subtle text-warning'
            }

            if (log.prioridad === 'Baja') {

                prioridadClase =
                    'bg-success-subtle text-success'
            }

            // =========================
            // COLOR ESTADO
            // =========================

            let estadoClase =
                'bg-primary-subtle text-primary'

            if (log.estado === 'En Proceso') {

                estadoClase =
                    'bg-warning-subtle text-warning'
            }

            if (log.estado === 'Cerrado') {

                estadoClase =
                    'bg-success-subtle text-success'
            }

            // =========================
            // CARD
            // =========================

            const col = document.createElement('div')

            col.className =
                'col-12 col-md-6 col-xl-4'

            col.innerHTML = `

                <div class="card border-0 shadow-sm rounded-4 h-100">

                    <div class="card-body p-4 d-flex flex-column">

                        <div class="d-flex justify-content-between align-items-center mb-4">

                            <span class="badge rounded-pill ${prioridadClase} px-3 py-2">

                                ${log.prioridad}

                            </span>

                            <small class="text-muted">

                                ${new Date(log.fecha)
                    .toLocaleDateString('es-ES')}

                            </small>

                        </div>

                        <h5 class="fw-bold mb-3">

                            ${log.descripcion}

                        </h5>

                        <div class="mt-auto">

                            <hr>

                            <div class="d-flex justify-content-between align-items-center">

                                <div>

                                    <small class="text-muted">

                                        Vehículo

                                    </small>

                                    <div class="fw-semibold">

                                        <button
                                            class="btn btn-link p-0 fw-semibold text-decoration-none btnVehiculoDetalle"
                                        >

                                            #${log.vehiculo_id}

                                        </button>

                                    </div>

                                </div>

                                <span class="badge rounded-pill ${estadoClase} px-3 py-2">

                                    ${log.estado}

                                </span>

                            </div>

                            <div class="mt-4 d-flex gap-2">

                                <button
                                    class="btn btn-sm btn-outline-warning btnEditar"
                                    title="Editar estado"
                                >
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <button
                                    class="btn btn-sm btn-outline-danger btnEliminar"
                                    title="Eliminar incidencia"
                                >
                                    <i class="bi bi-trash"></i>
                                </button>


                            </div>

                        </div>

                    </div>

                </div>
            `

            const btnEditar =
                col.querySelector('.btnEditar')

            btnEditar.addEventListener('click', () => {

                abrirModalEditar(log)
            })

            const btnEliminar =
                col.querySelector('.btnEliminar')

            btnEliminar.addEventListener('click', () => {

                eliminarLog(log._id)
            })

            const btnVehiculoDetalle =
                col.querySelector('.btnVehiculoDetalle')

            btnVehiculoDetalle.addEventListener('click', () => {

                navegarHacia(
                    `vehiculos/${log.vehiculo_id}`
                )
            })

            contenedor.appendChild(col)
        })
    }

    // =========================
    // FILTRAR
    // =========================

    function filtrarLogs() {

        const prioridad =
            document.getElementById(
                'filtroPrioridad'
            ).value

        const estado =
            document.getElementById(
                'filtroEstado'
            ).value

        const filtrados = logsGuardados.filter(log => {

            const coincidePrioridad =

                prioridad === '' ||
                log.prioridad === prioridad

            const coincideEstado =

                estado === '' ||
                log.estado === estado

            return coincidePrioridad &&
                coincideEstado
        })

        pintarLogs(filtrados)
    }

    // =========================
    // EVENTOS FILTROS
    // =========================

    document.getElementById(
        'filtroPrioridad'
    ).addEventListener('change', filtrarLogs)

    document.getElementById(
        'filtroEstado'
    ).addEventListener('change', filtrarLogs)

    // =========================
    // FORM EDITAR
    // =========================

    const formEditarLog =
        document.getElementById('formEditarLog')

    if (formEditarLog) {

        formEditarLog.addEventListener('submit', async (e) => {

            e.preventDefault()

            // VALIDACIÓN
            if (!formularioValido(formEditarLog)) return

            const id =
                document.getElementById('editLogId').value

            const datos = {

                descripcion:
                    document.getElementById(
                        'editDescripcion'
                    ).value,

                prioridad:
                    document.getElementById(
                        'editPrioridad'
                    ).value,

                estado:
                    document.getElementById(
                        'editEstado'
                    ).value,

                metadatos: {

                    tecnico:
                        document.getElementById(
                            'editTecnico'
                        ).value,

                    observaciones:
                        document.getElementById(
                            'editObservaciones'
                        ).value
                }
            }

            try {

                const res = await fetch(
                    `/api/logs/${id}`,
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify(datos)
                    }
                )

                if (!res.ok) {
                    throw new Error()
                }

                bootstrap.Modal.getInstance(
                    document.getElementById(
                        'modalEditarLog'
                    )
                ).hide()

                cargarLogs()

            } catch (error) {

                console.error(error)

                alert('Error al editar incidencia')
            }
        })
    }


    obtenerLogs()
}

// =========================
// CERRAR LOG
// =========================

async function cerrarLog(id) {

    const confirmar = confirm(
        '¿Cerrar incidencia?'
    )

    if (!confirmar) {
        return
    }

    try {

        const res = await fetch(
            `/api/logs/${id}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    estado: 'Cerrado'
                })
            }
        )

        if (!res.ok) {
            throw new Error()
        }

        cargarLogs()

    } catch (error) {

        console.error(error)

        alert('Error al cerrar incidencia')
    }
}

// =========================
// ELIMINAR LOG
// =========================

async function eliminarLog(id) {

    const confirmar = confirm(
        '¿Eliminar incidencia?'
    )

    if (!confirmar) {
        return
    }

    try {

        const res = await fetch(
            `/api/logs/${id}`,
            {
                method: 'DELETE'
            }
        )

        if (!res.ok) {
            throw new Error()
        }

        cargarLogs()

    } catch (error) {

        console.error(error)

        alert('Error al eliminar incidencia')
    }
}


function abrirModalEditar(log) {

    document.getElementById('editLogId').value =
        log._id

    document.getElementById('editDescripcion').value =
        log.descripcion || ''

    document.getElementById('editPrioridad').value =
        log.prioridad || 'Media'

    document.getElementById('editEstado').value =
        log.estado || 'Abierto'

    document.getElementById('editTecnico').value =
        log.metadatos?.tecnico || ''

    document.getElementById('editObservaciones').value =
        log.metadatos?.observaciones || ''

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                'modalEditarLog'
            )
        )

    modal.show()
}

