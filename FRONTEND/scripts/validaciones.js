

function formularioValido(form) {

    form.classList.add('was-validated')

    return form.checkValidity()
}

function activarValidacionBootstrap() {

    const forms = document.querySelectorAll('.needs-validation')

    forms.forEach(form => {

        if(form.dataset.validado) return

        form.dataset.validado = true

        form.addEventListener('submit', () => {

            form.classList.add('was-validated')

        })
    })
}