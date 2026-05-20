async function cargarClientes() {

    const formCliente = document.getElementById('formCliente')
    const buscarCliente = document.getElementById('buscarCliente')

    let clientesGuardados = []

    async function obtenerClientes() {

        try {

            const res = await fetch('/api/clientes')
            const data = await res.json()

            clientesGuardados = data

            pintarClientes(clientesGuardados)

        } catch(error) {

            console.error(error)

        }
    }

    formCliente.addEventListener('submit', async(e) => {

        e.preventDefault()

        if (!formularioValido(formCliente)) return


        const cliente = {

            cli_nombre: document.getElementById('nombre').value,
            cli_apellidos: document.getElementById('apellidos').value,
            cli_fecha_nac: document.getElementById('fecha').value,
            cli_email: document.getElementById('email').value,
            cli_telefono: document.getElementById('telefono').value

        }

        await fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(cliente)
        })

        formCliente.reset()

        formCliente.classList.remove('was-validated')

        obtenerClientes()
    })

    buscarCliente.addEventListener('input', () => {

        const texto = buscarCliente.value.toLowerCase()

        const filtrados = clientesGuardados.filter(cliente =>
            cliente.cli_nombre.toLowerCase().includes(texto)
        )

        pintarClientes(filtrados)
    })

    obtenerClientes()
}


function pintarClientes(clientes) {

    const tablaClientes = document.getElementById("tablaClientes")

    tablaClientes.innerHTML = ''

    clientes.forEach(cliente => {

        const tr = document.createElement('tr')

        tr.className = 'align-middle'
        tr.style.cursor = 'pointer'

        tr.innerHTML = `
            <td>${cliente.cli_nombre} ${cliente.cli_apellidos}</td>
            <td>${new Date(cliente.cli_fecha_nac).toLocaleDateString('es-ES')}</td>
            <td>${cliente.cli_email}</td>
            <td>${cliente.cli_telefono}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger btnEliminar">
                    <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning btnEditar">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `

        const btnEliminar = tr.querySelector('.btnEliminar')
        const btnEditar = tr.querySelector('.btnEditar')

        btnEliminar.addEventListener('click', async(e) => {

            e.stopPropagation()

            const confirmar = confirm('¿Eliminar cliente?')

            if(!confirm){
                return
            }

            await fetch(`/api/clientes/${cliente.cli_id}`, {
                method: 'DELETE'
            })

            tr.remove()
        })

        btnEditar.addEventListener('click', (e) => {

            e.stopPropagation()

            navegarHacia(`clientes/editar/${cliente.cli_id}`)
        })

        tr.addEventListener('click', () => {
            navegarHacia(`clientes/${cliente.cli_id}`)
        })

        tablaClientes.appendChild(tr)
    })
}