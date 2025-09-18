$(document).ready(function() {
    $('#createCandidatoForm').on('submit', function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Confirmar cadastro?',
            text: "Deseja realmente salvar este candidato?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, salvar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.submit();
            }
        });
    });
});