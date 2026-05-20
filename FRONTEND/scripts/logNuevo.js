async function iniciarFormularioLog(vehiculoId) {

    const form =
        document.getElementById('formLog')

    form.addEventListener('submit', async(e) => {

        e.preventDefault()

        // VALIDACIÓN
        if (!formularioValido(form)) return

        const log = {

            vehiculo_id: Number(vehiculoId),

            descripcion:
                document.getElementById('descripcion').value,

            prioridad:
                document.getElementById('prioridad').value,

            estado:
                document.getElementById('estado').value
        }

        try {

            const res = await fetch(
                '/api/logs',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(log)
                }
            )

            const data = await res.json()

            if(!res.ok) {
                throw new Error(data.error)
            }

            navegarHacia('logs')

        } catch(error) {

            console.error(error)

            alert('Error al guardar incidencia')
        }
    })
}