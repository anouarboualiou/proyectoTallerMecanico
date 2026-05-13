//FUNCION GET

const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
)

tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
})

const listaVehiculos = document.getElementById("listaVehiculos")

let vehiculosGuardados = []

async function cargarVehiculos() {

    iniciarEventos()
    
    await obtenerVehiculos()
    
}


async function obtenerVehiculos(){

    try {

        const res = await fetch('http://localhost:3000/api/vehiculos')
        const data = await res.json()

        vehiculosGuardados = data

        pintarVehiculos(vehiculosGuardados)

    }
    catch(error) {

        console.error(error)
    }
}

function pintarVehiculos(vehiculos) {

    const listaVehiculos = document.getElementById('listaVehiculos')

    listaVehiculos.innerHTML = ''

    vehiculos.forEach(vehiculo => {

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

        const tr = document.createElement('tr')

        tr.innerHTML = `

            <td>
                <button
                    class="btn btn-link fw-bold text-decoration-none p-0 btnDetalleVehiculo"
                >
                    #${vehiculo.veh_id}
                </button>
            </td>

            <td>

                <div class="fw-bold">
                    ${vehiculo.veh_marca}
                </div>

                <div class="text-muted small">
                    ${vehiculo.veh_modelo}
                </div>

            </td>

            <td>

                <span class="badge bg-light text-dark">
                    ${vehiculo.veh_matricula}
                </span>

            </td>

            <td>
                ${vehiculo.veh_motor}
            </td>

            <td>

                <span class="badge ${colorBadge}">
                    ${vehiculo.veh_combustible}
                </span>

            </td>

            <td>
                ${vehiculo.cli_nombre}
            </td>

            <td>

                <div class="d-flex gap-2">

                    
                   <button 
                        class="btn btn-sm btn-outline-success btnReparacion"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Asignar reparacion"
                    >
                        <i class="bi bi-tools"></i>
                    </button>

                    <button 
                        class="btn btn-sm btn-outline-dark btnLogs"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Asignar diagnosis/historial"
                    >
                        <i class="bi bi-journal-text"></i>
                    </button>

                    <button 
                        class="btn btn-sm btn-outline-warning btnEditar"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Editar vehículo"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button 
                        class="btn btn-sm btn-outline-danger btnEliminar"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Eliminar vehículo"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

            </td>
        `

        const btnEliminar = tr.querySelector('.btnEliminar')
        const btnEditar = tr.querySelector('.btnEditar')
        const btnReparacion = tr.querySelector('.btnReparacion')
        const btnLogs = tr.querySelector('.btnLogs')
        const btnDetalleVehiculo = tr.querySelector('.btnDetalleVehiculo')


        btnEliminar.addEventListener('click', () => {
            eliminarVehiculo(vehiculo.veh_id)
        })

        btnEditar.addEventListener('click', () => {
            editarVehiculo(vehiculo.veh_id)
        })

        btnReparacion.addEventListener('click', () => {

            navegarHacia(
                `reparaciones/nueva/${vehiculo.veh_id}`
            )
        })

        btnLogs.addEventListener('click', () => {

            navegarHacia(
                `logs/nuevo/${vehiculo.veh_id}`
            )
        })

        btnDetalleVehiculo.addEventListener('click', () => {

            navegarHacia(
                `vehiculos/${vehiculo.veh_id}`
            )
        })



        listaVehiculos.appendChild(tr)
    })
}


function filtrarVehiculos() {

    const buscarVehiculo = document.getElementById('buscarVehiculo')
    const filtroCombustible = document.getElementById('filtroCombustible')

    const texto = buscarVehiculo.value.toLowerCase()
    const combustible = filtroCombustible.value

    const filtrados = vehiculosGuardados.filter(vehiculo => {

        const coincideTexto =

            vehiculo.veh_marca.toLowerCase().includes(texto) ||
            vehiculo.veh_modelo.toLowerCase().includes(texto) ||
            vehiculo.veh_matricula.toLowerCase().includes(texto)

        const coincideCombustible =

            combustible === '' ||
            vehiculo.veh_combustible === combustible

        return coincideTexto && coincideCombustible
    })

    pintarVehiculos(filtrados)
}


function iniciarEventos() {

    const buscarVehiculo = document.getElementById('buscarVehiculo')
    const filtroCombustible = document.getElementById('filtroCombustible')

    buscarVehiculo.addEventListener('input', filtrarVehiculos)

    filtroCombustible.addEventListener('change', filtrarVehiculos)
}


function iniciarFormularioVehiculo() {

    cargarClientesSelect()

    const formVehiculo = document.getElementById('formVehiculo')

    formVehiculo.addEventListener('submit', async(e) => {

        e.preventDefault()

        const vehiculo = {

            veh_marca: document.getElementById('veh_marca').value,

            veh_modelo: document.getElementById('veh_modelo').value,

            veh_matricula: document.getElementById('veh_matricula').value,

            veh_motor: document.getElementById('veh_motor').value,

            veh_combustible: document.getElementById('veh_combustible').value,

            cli_id: Number(document.getElementById('cli_id').value)
        }

        await fetch('http://localhost:3000/api/vehiculos', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(vehiculo)
        })

        navegarHacia('vehiculos')
    })
}

async function cargarClientesSelect() {

    const select = document.getElementById('cli_id')

    try {

        const res = await fetch(
            'http://localhost:3000/api/clientes'
        )

        const clientes = await res.json()

        clientes.forEach(cliente => {

            const option = document.createElement('option')

            option.value = cliente.cli_id

            option.textContent = cliente.cli_nombre

            select.appendChild(option)
        })

    }
    catch(error) {

        console.error(error)
    }
}

async function eliminarVehiculo(id) {

    const confirmar = confirm(
        '¿Eliminar vehículo?'
    )

    if(!confirmar) {
        return
    }

    try {

        await fetch(
            `http://localhost:3000/api/vehiculos/${id}`,
            {
                method: 'DELETE'
            }
        )

        obtenerVehiculos()

    }
    catch(error) {

        console.error(error)
    }
}

function editarVehiculo(id) {

    navegarHacia(
        `vehiculos/editar/${id}`
    )
}