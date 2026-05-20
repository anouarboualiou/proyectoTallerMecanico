async function iniciarFormularioReparacion(vehiculoId) {

    const form =
        document.getElementById('formReparacion')

    const piezaSelect =
        document.getElementById('piezaSelect')

    const cantidadInput =
        document.getElementById('cantidadPieza')

    const btnAgregarPieza =
        document.getElementById('btnAgregarPieza')

    const tablaPiezas =
        document.getElementById('tablaPiezas')

    let piezasReparacion = []

    // =========================
    // CARGAR PIEZAS
    // =========================

    async function cargarPiezas() {

        const res = await fetch(
            '/api/piezas'
        )

        const piezas = await res.json()

        piezaSelect.innerHTML =
            '<option value="">Seleccionar pieza</option>'

        piezas.forEach(pieza => {

            piezaSelect.innerHTML += `
                <option
                    value="${pieza.piez_id}"

                    data-precio="${pieza.piez_precio}"

                    data-nombre="${pieza.piez_nombre}"
                >
                    ${pieza.piez_nombre}
                </option>
            `
        })
    }

    // =========================
    // PINTAR PIEZAS
    // =========================

    function pintarPiezas() {

        tablaPiezas.innerHTML = ''

        let totalPiezas = 0

        piezasReparacion.forEach((pieza, index) => {

            const total =
                pieza.precio * pieza.cantidad

            totalPiezas += total

            const tr = document.createElement('tr')

            tr.innerHTML = `
                <td>${pieza.nombre}</td>

                <td>${pieza.cantidad}</td>

                <td>${pieza.precio}€</td>

                <td>${total.toFixed(2)}€</td>

                <td>
                    <button
                        class="btn btn-sm btn-outline-danger"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `

            const btnEliminar =
                tr.querySelector('button')

            btnEliminar.addEventListener('click', () => {

                piezasReparacion.splice(index, 1)

                pintarPiezas()
            })

            tablaPiezas.appendChild(tr)
        })

        calcularTotales(totalPiezas)
    }

    // =========================
    // CALCULAR TOTALES
    // =========================

    function calcularTotales(totalPiezas = 0) {

        const horas =
            Number(document.getElementById('rep_duracion').value) || 0

        const precioHora =
            Number(document.getElementById('rep_precio_hora').value) || 0

        const totalManoObra =
            horas * precioHora

        const total =
            totalManoObra + totalPiezas

        document.getElementById('totalManoObra')
            .textContent =
            `${totalManoObra.toFixed(2)}€`

        document.getElementById('totalPiezas')
            .textContent =
            `${totalPiezas.toFixed(2)}€`

        document.getElementById('totalReparacion')
            .textContent =
            `${total.toFixed(2)}€`
    }

    // =========================
    // AÑADIR PIEZA
    // =========================

    btnAgregarPieza.addEventListener('click', () => {

        const option =
            piezaSelect.selectedOptions[0]

        if(!option.value) {
            return
        }

        const pieza = {

            piez_id: Number(option.value),

            nombre:
                option.dataset.nombre,

            precio:
                Number(option.dataset.precio),

            cantidad:
                Number(cantidadInput.value)
        }

        piezasReparacion.push(pieza)

        pintarPiezas()
    })

    // recalcular mano obra
    document.getElementById('rep_duracion')
        .addEventListener('input', () => {
            pintarPiezas()
        })

    document.getElementById('rep_precio_hora')
        .addEventListener('input', () => {
            pintarPiezas()
    })



    // =========================
    // GUARDAR
    // =========================

    form.addEventListener('submit', async(e) => {

        e.preventDefault()

        // VALIDACIÓN
        if (!formularioValido(form)) return

         // =========================
        // CALCULO TOTAL
        // =========================
        
        const horas = Number(document.getElementById('rep_duracion').value)
        const precioHora = Number(document.getElementById('rep_precio_hora').value)

        const totalManoObra = horas * precioHora

        const totalPiezas = piezasReparacion.reduce((acc, pieza) => {
            return acc + (pieza.precio * pieza.cantidad)
        }, 0)

        const total = totalManoObra + totalPiezas

        const reparacion = {

            rep_tipo:
                document.getElementById('rep_tipo').value,

            rep_duracion:
                document.getElementById('rep_duracion').value,

            rep_garantia:
                document.getElementById('rep_garantia').value,

            rep_precio: total,

            rep_fecha:
                document.getElementById('rep_fecha').value,

            veh_id: Number(vehiculoId)
        }

        try {

            // =========================
            // GUARDAR REPARACIÓN
            // =========================

            const res = await fetch(
                '/api/reparaciones',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(reparacion)
                }
            )

            const data = await res.json()

            if(!res.ok) {
                throw new Error(data.error)
            }

            const repId = data.id

            // =========================
            // GUARDAR PIEZAS
            // =========================

            for(const pieza of piezasReparacion) {

                await fetch(
                    '/api/reparaciones/piezas',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({

                            rep_id: repId,

                            piez_id: pieza.piez_id,

                            cantidad: pieza.cantidad
                        })
                    }
                )
            }

            navegarHacia('vehiculos')

        } catch(error) {

            console.error(error)

            alert('Error al guardar reparación')
        }
    })

    cargarPiezas()
}