$(document).ready(function() {
    $('#edit-vaga-form').on('submit', function(e) {
        e.preventDefault(); 
        const form = this;

        Swal.fire({
            title: 'Deseja realmente atualizar esta vaga?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, atualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            allowOutsideClick: false,
            didOpen: () => {
                
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Atualizando...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });
                form.submit();
            }
        });
    });
});