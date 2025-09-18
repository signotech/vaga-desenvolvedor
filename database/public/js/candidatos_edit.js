$(document).ready(function() {
    $('#editCandidatoForm').on('submit', function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Você tem certeza?',
            text: "Deseja realmente atualizar este candidato?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, atualizar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.submit();
            }
        });
    });
});