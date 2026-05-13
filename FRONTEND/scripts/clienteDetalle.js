async function cargarDetalleCliente(id) {

    // =========================
    // CLIENTE
    // =========================

    const res = await fetch(
        `http://localhost:3000/api/clientes/${id}`
    )

    const cliente = await res.json()

    document.getElementById('nombreCliente').textContent =
        `${cliente.cli_nombre} ${cliente.cli_apellidos}`

    document.getElementById('detalleNombre').textContent =
        `${cliente.cli_nombre} ${cliente.cli_apellidos}`

    document.getElementById('detalleTelefono').textContent =
        cliente.cli_telefono

    document.getElementById('detalleEmail').textContent =
        cliente.cli_email

    document.getElementById('detalleFecha').textContent =
        new Date(cliente.cli_fecha_nac)
            .toLocaleDateString('es-ES')

    // =========================
    // VEHÍCULOS
    // =========================

    const resVehiculos = await fetch(
        `http://localhost:3000/api/vehiculos/cliente/${id}`
    )

    const vehiculos = await resVehiculos.json()

    const tablaVehiculos =
        document.getElementById('tablaVehiculos')

    tablaVehiculos.innerHTML = ''

    // Si no tiene vehículos
    if (vehiculos.length === 0) {

        tablaVehiculos.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted">
                    Este cliente no tiene vehículos
                </td>
            </tr>
        `

        return
    }

    vehiculos.forEach(vehiculo => {

        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td>${vehiculo.veh_matricula}</td>
            <td>${vehiculo.veh_marca}</td>
            <td>${vehiculo.veh_modelo}</td>
            <td>${vehiculo.veh_combustible}</td>
        `

        tablaVehiculos.appendChild(tr)
    })
}