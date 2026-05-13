async function cargarEditarCliente(id) {

    const res = await fetch(`http://localhost:3000/api/clientes/${id}`)
    const cliente = await res.json()

    document.getElementById('editNombre').value = cliente.cli_nombre
    document.getElementById('editApellidos').value = cliente.cli_apellidos
    document.getElementById('editFecha').value = cliente.cli_fecha_nac.split('T')[0]
    document.getElementById('editEmail').value = cliente.cli_email
    document.getElementById('editTelefono').value = cliente.cli_telefono

    const form = document.getElementById('formEditarCliente')

    form.addEventListener('submit', async(e) => {

        e.preventDefault()

        const clienteActualizado = {

            cli_nombre: document.getElementById('editNombre').value,
            cli_apellidos: document.getElementById('editApellidos').value,
            cli_fecha_nac: document.getElementById('editFecha').value,
            cli_email: document.getElementById('editEmail').value ,
            cli_telefono: document.getElementById('editTelefono').value
        }

        await fetch(`http://localhost:3000/api/clientes/${id}`, {

            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(clienteActualizado)

        })

        navegarHacia('clientes')
    })
}