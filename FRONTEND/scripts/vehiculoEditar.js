async function cargarEditarVehiculo(id) {

    await cargarClientesSelect()

    const res = await fetch(
        `http://localhost:3000/api/vehiculos/${id}`
    )

    const vehiculo = await res.json()

    document.getElementById('veh_marca').value = vehiculo.veh_marca
    document.getElementById('veh_modelo').value = vehiculo.veh_modelo
    document.getElementById('veh_matricula').value = vehiculo.veh_matricula
    document.getElementById('veh_motor').value = vehiculo.veh_motor
    document.getElementById('veh_combustible').value = vehiculo.veh_combustible
    document.getElementById('cli_id').value = vehiculo.cli_id

    const form = document.getElementById('formEditarVehiculo')

    form.addEventListener('submit', async(e) => {

        e.preventDefault()

        const vehiculoActualizado = {

            veh_marca: document.getElementById('veh_marca').value,

            veh_modelo: document.getElementById('veh_modelo').value,

            veh_matricula: document.getElementById('veh_matricula').value,

            veh_motor: document.getElementById('veh_motor').value,

            veh_combustible: document.getElementById('veh_combustible').value,

            cli_id: Number(document.getElementById('cli_id').value)
        }

        await fetch(
            `http://localhost:3000/api/vehiculos/${id}`,
            {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(
                    vehiculoActualizado
                )
            }
        )

        navegarHacia('vehiculos')
    })
}