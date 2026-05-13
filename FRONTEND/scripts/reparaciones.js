async function cargarReparaciones() {

    const tabla =
        document.getElementById('tablaReparaciones')

    async function obtenerReparaciones() {

        const res = await fetch(
            'http://localhost:3000/api/reparaciones'
        )

        const reparaciones = await res.json()

        pintarReparaciones(reparaciones)
    }

    function pintarReparaciones(reparaciones) {

        tabla.innerHTML = ''

        reparaciones.forEach(rep => {

            const tr = document.createElement('tr')

            tr.innerHTML = `
                <td>${rep.veh_marca} ${rep.veh_modelo}</td>
                <td>${rep.rep_tipo}</td>

                <td>
                    ${new Date(rep.rep_fecha)
                        .toLocaleDateString('es-ES')}
                </td>

                <td>${rep.rep_duracion}h</td>
                <td>${rep.rep_garantia} meses</td>
                <td>${rep.rep_precio}€</td>

                <td>

                     <button class="btn btn-sm btn-outline-dark btnDetalle">
                        <i class="bi bi-eye"></i>
                    </button>

                    <button class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `

            const btnEliminar = tr.querySelector('.btn-outline-danger')
            const btnDetalle = tr.querySelector('.btnDetalle')
            
            btnEliminar.addEventListener('click', () => {
                eliminarReparacion(rep.rep_id, tr)
            })

            btnDetalle.addEventListener('click', () => {
                mostrarDetalleReparacion(rep.rep_id)
            })



            tabla.appendChild(tr)
        })
    }

    obtenerReparaciones()
}


async function eliminarReparacion(id, tr) {

    const confirmar =
        confirm('¿Eliminar reparación?')

    if(!confirmar) {
        return
    }

    try {

        const res = await fetch(
            `http://localhost:3000/api/reparaciones/${id}`,
            {
                method: 'DELETE'
            }
        )

        const data = await res.json()

        if(!res.ok) {
            throw new Error(data.error)
        }

        tr.remove()

    } catch(error) {

        console.error(error)

        alert('Error al eliminar reparación')
    }
    
}

async function mostrarDetalleReparacion(id) {

    const res = await fetch(
        `http://localhost:3000/api/reparaciones/${id}/detalle`
    )

    const detalle = await res.json()

    const contenedor =
        document.getElementById(
            'contenidoDetalleReparacion'
        )

    const rep = detalle[0]

    let piezasHTML = ''

    let totalPiezas = 0

    detalle.forEach(pieza => {

        if(!pieza.piez_nombre) {
            return
        }

        const subtotal =
            pieza.piez_precio * pieza.cantidad

        totalPiezas += subtotal

        piezasHTML += `
            <tr>

                <td>${pieza.piez_nombre}</td>

                <td>${pieza.cantidad}</td>

                <td>${pieza.piez_precio}€</td>

                <td>${subtotal.toFixed(2)}€</td>

            </tr>
        `
    })

    const manoObra =
        rep.rep_precio - totalPiezas

    contenedor.innerHTML = `

        <div class="mb-4">

            <h4>
                ${rep.rep_tipo}
            </h4>

            <p class="text-muted mb-1">
                ${rep.veh_marca} ${rep.veh_modelo}
            </p>

            <p class="text-muted">
                ${rep.veh_matricula}
            </p>

        </div>

        <h5 class="mb-3">
            Piezas utilizadas
        </h5>

        <table class="table">

            <thead>

                <tr>

                    <th>Pieza</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>

                </tr>

            </thead>

            <tbody>

                ${piezasHTML}

            </tbody>

        </table>

        <div class="mt-4">

            <div class="d-flex justify-content-between">

                <span>Mano obra</span>

                <strong>
                    ${manoObra.toFixed(2)}€
                </strong>

            </div>

            <div class="d-flex justify-content-between">

                <span>Total piezas</span>

                <strong>
                    ${totalPiezas.toFixed(2)}€
                </strong>

            </div>

            <hr>

            <div class="d-flex justify-content-between">

                <h5>Total</h5>

                <h5>
                    ${rep.rep_precio}€
                </h5>

            </div>

        </div>
    `

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                'modalDetalleReparacion'
            )
        )

    modal.show()
}